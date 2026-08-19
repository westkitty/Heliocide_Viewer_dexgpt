import test from 'node:test';
import assert from 'node:assert/strict';
import { CHECKPOINTS, PHASES, phaseForTime, phaseProgress } from '../src/timeline.js';
import { VISUAL_TARGETS } from '../src/visualRevision.js';

test('phase model is deterministic and complete',()=>{
  assert.equal(PHASES.length,8);
  assert.deepEqual(PHASES.map(p=>p.id),['A','B','C','D','E','F','G','H']);
  assert.equal(phaseForTime(8).id,'A');
  assert.equal(phaseForTime(40).id,'C');
  assert.equal(phaseForTime(65).id,'D');
  assert.equal(phaseForTime(90).id,'E');
  assert.equal(phaseForTime(112).id,'F');
  assert.equal(phaseForTime(130).id,'G');
  assert.equal(phaseForTime(138).id,'H');
});

test('hero checkpoint times are locked',()=>{
  assert.deepEqual(CHECKPOINTS,{A_NORMAL:8,C_SHARD_GOD:40,D_COLLAPSE:65,E_BREACH:90,F_SIEGE_WALL:112,G_STATION_LOSS:130,H_REPLAY:138});
});

test('phase progress clamps',()=>{
  assert.equal(phaseProgress(-10,PHASES[0]),0);
  assert.equal(phaseProgress(999,PHASES[0]),1);
});

test('campaign exposes exactly fifty visual domains',()=>assert.equal(VISUAL_TARGETS.length,50));
