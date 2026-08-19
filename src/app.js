import { HeliocideRenderer } from './renderer.js';
import { SoundSystem } from './audio.js';
import { VISUAL_REVISION, VISUAL_TARGETS } from './visualRevision.js';
import { CHECKPOINTS, DURATION, PHASES, checkpointTime, phaseForTime, phaseProgress } from './timeline.js';
import { buildUI } from './ui.js';

const params = new URLSearchParams(window.__CAPTURE_QUERY__ ?? location.search);
const requestedRevision = Number(params.get('revision'));
const revision = Number.isFinite(requestedRevision) ? Math.max(0, Math.min(50, requestedRevision)) : VISUAL_REVISION;
const checkpoint = params.get('checkpoint');
const explicitTime = Number(params.get('t'));
const initialTime = checkpointTime(checkpoint) ?? (Number.isFinite(explicitTime) ? explicitTime : 0);
const deterministic = params.get('live') !== '1' && (params.get('deterministic') === '1' || checkpoint !== null || Number.isFinite(explicitTime));

const state = {
  revision,
  time: Math.max(0, Math.min(DURATION, initialTime)),
  playing: !deterministic,
  replayUnlocked: initialTime >= 138,
  phaseIndex: 0,
  phaseProgress: 0,
  yaw: 0,
  pitch: 0,
  x: 0,
  z: 0,
  cameraMode: checkpoint === 'G_STATION_LOSS' ? 2 : checkpoint === 'H_REPLAY' ? 2 : 0
};

const lifecycle = new AbortController();
const { signal } = lifecycle;
const root = document.querySelector('#app');
const canvas = document.querySelector('#scene');
const runtimeStatus = document.querySelector('#audio-status');
const renderer = new HeliocideRenderer(canvas, revision);
const sound = new SoundSystem(runtimeStatus);
const metrics = { frames: 0, samples: [], maxFrameMs: 0, start: performance.now(), errors: [] };
let last = performance.now();
let pointerLocked = false;
const keys = new Set();
const scheduleFrame = deterministic
  ? (callback) => setTimeout(() => callback(performance.now()), 16)
  : (callback) => requestAnimationFrame(callback);

function recomputePhase() {
  const phase = phaseForTime(state.time);
  state.phaseIndex = PHASES.indexOf(phase);
  state.phaseProgress = phaseProgress(state.time, phase);
  if (state.time >= 138) state.replayUnlocked = true;
}

function setTime(value) {
  state.time = Math.max(0, Math.min(DURATION, value));
  recomputePhase();
}
function setPlaying(value) { state.playing = Boolean(value); }
function setCameraMode(value) { state.cameraMode = Math.max(0, Math.min(3, value)); }
function reset() {
  state.time = 0; state.playing = true; state.replayUnlocked = false;
  state.yaw = 0; state.pitch = 0; state.x = 0; state.z = 0; state.cameraMode = 0;
  recomputePhase();
}

const ui = buildUI({ root, state, setTime, setPlaying, setCameraMode, reset, sound, signal });
recomputePhase();

canvas.addEventListener('click', () => canvas.requestPointerLock?.(), { signal });
document.addEventListener('pointerlockchange', () => { pointerLocked = document.pointerLockElement === canvas; }, { signal });
document.addEventListener('mousemove', (event) => {
  if (!pointerLocked || document.documentElement.dataset.reducedMotion === 'true') return;
  state.yaw += event.movementX * 0.0016;
  state.pitch = Math.max(-1.05, Math.min(1.05, state.pitch - event.movementY * 0.0014));
}, { signal });
document.addEventListener('keydown', (event) => keys.add(event.code), { signal });
document.addEventListener('keyup', (event) => keys.delete(event.code), { signal });
window.addEventListener('error', (event) => metrics.errors.push(String(event.error || event.message)), { signal });
window.addEventListener('unhandledrejection', (event) => metrics.errors.push(String(event.reason)), { signal });
window.addEventListener('pagehide', () => { lifecycle.abort(); renderer.dispose(); sound.dispose?.(); }, { once: true });

function updateMovement(dt) {
  const speed = 0.65 * dt;
  if (keys.has('KeyW')) state.z -= speed;
  if (keys.has('KeyS')) state.z += speed;
  if (keys.has('KeyA')) state.x -= speed;
  if (keys.has('KeyD')) state.x += speed;
  state.yaw += (state.x * 0.00006);
  state.pitch += (state.z * 0.00003);
}

function publishMetrics() {
  const sorted = [...metrics.samples].sort((a,b)=>a-b);
  const pick = (p) => sorted.length ? sorted[Math.min(sorted.length-1, Math.floor((sorted.length-1)*p))] : 0;
  const payload = {
    revision,
    frames: metrics.frames,
    p50: Number(pick(.50).toFixed(3)),
    p95: Number(pick(.95).toFixed(3)),
    p99: Number(pick(.99).toFixed(3)),
    maxFrameMs: Number(metrics.maxFrameMs.toFixed(3)),
    errors: [...metrics.errors],
    renderer: renderer.info(),
    time: Number(state.time.toFixed(3)),
    phase: PHASES[state.phaseIndex].id,
    checkpoint: checkpoint || null,
    cameraMode: state.cameraMode,
    visualTarget: revision > 0 ? VISUAL_TARGETS[revision-1] : 'baseline',
    captureMode: deterministic ? 'deterministic-timer' : 'requestAnimationFrame',
    frameSamples: metrics.samples.slice(-180).map((value) => Number(value.toFixed(3)))
  };
  window.__HELIOCIDE_METRICS__ = payload;
  document.querySelector('#metrics-json').textContent = JSON.stringify(payload);
  document.documentElement.dataset.runtimeOk = payload.errors.length === 0 ? 'true' : 'false';
}

function frame(now) {
  const rawDt = Math.min(0.05, Math.max(0, (now-last)/1000));
  last = now;
  const dt = deterministic ? 1/60 : rawDt;
  const frameMs = rawDt*1000;
  if (metrics.frames > 4 && Number.isFinite(frameMs) && frameMs > 0) {
    metrics.samples.push(frameMs);
    if (metrics.samples.length > 600) metrics.samples.shift();
    metrics.maxFrameMs = Math.max(metrics.maxFrameMs, frameMs);
  }
  metrics.frames += 1;
  if (state.playing) {
    state.time += dt;
    if (state.time >= DURATION) { state.time = DURATION; state.playing = false; state.replayUnlocked = true; }
  }
  updateMovement(dt);
  recomputePhase();
  renderer.render(state);
  ui.update();
  if (metrics.frames % 15 === 0) publishMetrics();
  scheduleFrame(frame);
}

window.__HELIOCIDE_STATE__ = state;
publishMetrics();
scheduleFrame(frame);
