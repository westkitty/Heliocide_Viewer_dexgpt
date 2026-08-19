import { PHASES, DURATION } from './timeline.js';

const alertCopy = {
  A: 'HV-88 · HAL\'VEN OBSERVATION NODE · NOMINAL',
  B: 'PRIORITY REPORT · AUREAL GATE · STARSILK WEAPONIZATION CONFIRMED',
  C: 'CONTAINMENT AUTHORITY IDENTIFIED · SHARD GOD',
  D: 'LOCAL HELIOCIDE EVENT · STELLAR CONTAINMENT ACTION',
  E: 'CASCADE PROPAGATION · EVACUATION FAILURE',
  F: 'EXTERNAL VISIBILITY LOSS · SIEGE WALL FORMATION',
  G: 'ORBITAL STATE NONVIABLE · STATION LOSS',
  H: 'FORENSIC RECORD · ALL STATION PERSONNEL DECEASED'
};

export function buildUI({ root, state, setTime, setPlaying, setCameraMode, reset, sound, signal }) {
  const phaseLabel = root.querySelector('#phase-label');
  const alert = root.querySelector('#alert-copy');
  const clock = root.querySelector('#mission-clock');
  const dossier = root.querySelector('#dossier');
  const consolePanel = root.querySelector('#console-panel');
  const replay = root.querySelector('#replay');
  const slider = root.querySelector('#replay-slider');
  const playButton = root.querySelector('#replay-play');
  const accessibility = root.querySelector('#accessibility');
  const status = root.querySelector('#runtime-status');
  const crew = [...root.querySelectorAll('.crew')];
  const finalTitle = root.querySelector('#containment-achieved');
  const breach = root.querySelector('#breach-overlay');

  function toggleConsole(force) {
    const open = force ?? consolePanel.hidden;
    consolePanel.hidden = !open;
    consolePanel.setAttribute('aria-hidden', String(!open));
  }

  root.querySelector('#console-button').addEventListener('click', () => toggleConsole(), { signal });
  root.querySelector('#audio-button').addEventListener('click', () => sound.unlock(), { signal });
  root.querySelector('#replay-play').addEventListener('click', () => setPlaying(!state.playing), { signal });
  root.querySelector('#restart-button').addEventListener('click', reset, { signal });
  root.querySelector('#close-console').addEventListener('click', () => toggleConsole(false), { signal });
  root.querySelector('#reduce-motion').addEventListener('change', (event) => {
    document.documentElement.dataset.reducedMotion = event.target.checked ? 'true' : 'false';
  }, { signal });
  root.querySelector('#accessibility-button').addEventListener('click', () => {
    accessibility.hidden = !accessibility.hidden;
  }, { signal });
  slider.addEventListener('input', (event) => setTime(Number(event.target.value)), { signal });
  root.querySelectorAll('[data-camera]').forEach((button) => {
    button.addEventListener('click', () => setCameraMode(Number(button.dataset.camera)), { signal });
  });
  document.addEventListener('keydown', (event) => {
    if (event.code === 'KeyE') toggleConsole();
    if (event.code === 'Escape') toggleConsole(false);
    if (state.replayUnlocked && event.code === 'Space') {
      event.preventDefault();
      setPlaying(!state.playing);
    }
  }, { signal });

  return {
    update() {
      const phase = PHASES[state.phaseIndex];
      phaseLabel.textContent = `${phase.id} · ${phase.name}`;
      alert.textContent = alertCopy[phase.id];
      clock.textContent = `${state.time.toFixed(1).padStart(5,'0')} / ${DURATION.toFixed(0)} s`;
      root.dataset.phase = phase.id;
      root.dataset.revision = String(state.revision);
      dossier.hidden = !(phase.id === 'C' || (state.replayUnlocked && state.cameraMode === 3));
      if (phase.id === 'C') dossier.setAttribute('aria-live', 'polite');
      replay.hidden = !state.replayUnlocked;
      slider.value = String(state.time);
      playButton.textContent = state.playing ? 'Pause' : 'Play';
      finalTitle.classList.toggle('visible', phase.id === 'G' && state.time > 134.5);
      breach.classList.toggle('active', ['E','F','G'].includes(phase.id));
      breach.classList.toggle('refined', state.revision >= 39);
      status.textContent = state.replayUnlocked ? 'FORENSIC BUFFER UNLOCKED' : 'LIVE OBSERVATION';

      crew.forEach((node, index) => {
        node.dataset.phase = phase.id;
        node.style.setProperty('--crew-index', index);
        node.classList.toggle('evacuating', ['D','E'].includes(phase.id));
        node.classList.toggle('zero-g', state.revision >= 45 && ['E','F'].includes(phase.id));
        node.classList.toggle('lost', phase.id === 'G' || phase.id === 'H');
      });
      sound.setPhase(state.phaseIndex, state.phaseProgress);
    }
  };
}
