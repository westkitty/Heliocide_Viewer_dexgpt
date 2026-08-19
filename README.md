# HELIOCIDE OBSERVATORY — DexGPT

Independent implementation of the Starsilk Heliocide Observatory experience, owned by this repository only.

The player is an unnamed Administration observer aboard Observation Station HV-88 in an inhabited Hal'Ven system. A deterministic eight-phase timeline moves from ordinary system observation through the Aureal Gate alert, Shard God identification, controlled heliocide, cascade, Siege Wall formation, station loss, and forensic replay.

## Architecture

The repository is deliberately zero-network at runtime and during deterministic validation. The current browser renderer is a self-contained WebGL2 full-screen procedural scene with semantic DOM interaction and accessibility surfaces. No runtime assets are hotlinked.

## Validation

```bash
npm ci
npm run typecheck
npm test
npm run build
npm run serve
```

In another shell:

```bash
bash scripts/capture.sh 0 A_NORMAL /tmp/a-normal.png
bash scripts/smoke.sh 0 A_NORMAL
```

Deterministic screenshot checkpoints use 1600×900 and may select a visual revision with `?revision=N` without altering campaign state.

## Controls

- Click the viewport for pointer look; `Escape` exits pointer lock.
- `WASD` moves the observer viewpoint.
- `E` opens the tactical console.
- The final forensic interface supports scrub, play/pause, camera modes, and return to beginning.
- Station audio requires an explicit user gesture and has visible equivalents.
