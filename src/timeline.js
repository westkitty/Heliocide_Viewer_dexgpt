export const DURATION = 140;
export const CHECKPOINTS = Object.freeze({
  A_NORMAL: 8,
  C_SHARD_GOD: 40,
  D_COLLAPSE: 65,
  E_BREACH: 90,
  F_SIEGE_WALL: 112,
  G_STATION_LOSS: 130,
  H_REPLAY: 138
});

export const PHASES = Object.freeze([
  { id: 'A', name: 'NORMAL', start: 0, end: 28 },
  { id: 'B', name: 'AUREAL GATE ALERT', start: 28, end: 38 },
  { id: 'C', name: 'SHARD GOD AUTHORITY', start: 38, end: 58 },
  { id: 'D', name: 'HELIOCIDE', start: 58, end: 85 },
  { id: 'E', name: 'CASCADE', start: 85, end: 108 },
  { id: 'F', name: 'SIEGE WALL', start: 108, end: 125 },
  { id: 'G', name: 'STATION LOSS', start: 125, end: 138 },
  { id: 'H', name: 'FORENSIC REPLAY', start: 138, end: DURATION }
]);

export function phaseForTime(time) {
  const t = Math.max(0, Math.min(DURATION, Number(time) || 0));
  return PHASES.find((phase) => t >= phase.start && t < phase.end) ?? PHASES.at(-1);
}

export function phaseProgress(time, phase = phaseForTime(time)) {
  return Math.max(0, Math.min(1, (time - phase.start) / Math.max(0.001, phase.end - phase.start)));
}

export function checkpointTime(name) {
  return CHECKPOINTS[name] ?? null;
}
