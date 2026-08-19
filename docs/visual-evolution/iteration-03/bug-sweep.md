# Visual-03 Candidate Bug Sweep

## Scope and proof level

Candidate-only sweep for revision three, `High-quality stellar sprite shader`. This candidate is not numbered acceptance evidence because the exact canonical primary Shard God reference is still absent remotely and the GitHub runner used the explicitly documented ephemeral secondary-reference fallback.

## Attempt history

### Attempt 01 — REJECTED

Run `32221244874`, artifact `9354015012`.

- Revision-two before and revision-three after rendered.
- D_COLLAPSE neighbor failed after the third Chromium target became unresponsive.
- Direct screenshot review independently rejected the visual result: point-spread footprints were strongly vertical and the halo was too broad/energetic.
- Same iteration number was retained.

### Attempt 02 — candidate pass

Implementation uses the proven visual-02 source unchanged plus a bounded revision-three shader source patch:

- preserves revision-two positions/population exactly;
- compensates the starfield's horizontal pre-scaling only for revision-three distance calculation;
- reduces Gaussian core width/energy;
- reduces halo width/energy;
- introduces no galactic haze, twinkle, exposure integration, or later-domain work.

Generic capture tooling was separately repaired on `main` and carried into the candidate so each successful CDP target is closed before the next capture.

## Coverage map

- `src/shaders.js`: proven visual-02 distribution source retained.
- `src/shaderRevisionPatch.js`: bounded revision-three point-spread transformation.
- `src/renderer.js`: routes shader source through the patch module.
- `src/visualRevision.js`: revision three and target mapping.
- `src/app.js`, `src/timeline.js`, `src/ui.js`: deterministic revision/checkpoint, phase, HUD, crew, and control surfaces.
- `scripts/cdp-capture.mjs`: bounded command/screenshot waits and completed-target cleanup.
- Authoritative successful retry: workflow run `32221960801`, attempt 2.
- Artifact: `9354263130`.
- Direct review of 1600x900 A_NORMAL before/after and D_COLLAPSE neighbor frames.

## Technical sweep

- `npm ci`: PASS.
- Typecheck/contracts: PASS with documented candidate-only asset fallback.
- Tests: PASS.
- Build: PASS.
- Shader patch exact-target assertion: PASS through module evaluation/build/runtime.
- First run attempt browser startup: transient runner failure before any page opened; source was unchanged and not implicated.
- Unchanged retry browser startup: PASS.
- Revision-two A_NORMAL before capture: PASS.
- Revision-three A_NORMAL after capture: PASS.
- Revision-three D_COLLAPSE neighbor capture: PASS.
- Candidate status: `before_rc=0`, `after_rc=0`, `neighbor_rc=0`.
- Application runtime errors: none.
- Browser errors: none.
- Capture target cleanup: PASS; the third capture completed after the cleanup repair.

## Performance screen

GitHub software WebGL only:

- before p50/p95/p99: 16.5 / 17.9 / 19.5 ms;
- after p50/p95/p99: 16.4 / 19.5 / 20.5 ms;
- neighbor p50/p95/p99: 16.6 / 18.2 / 18.6 ms.

The after p95 is about 8.9% above the matched before sample. That is a measurable but bounded candidate cost for the Gaussian point-spread treatment; it does not trigger a numbered performance checkpoint, and representative-hardware GPU performance remains unverified.

## Independent visual resweep

Direct inspection found:

- revision-three stars read as compact stellar points with restrained halos rather than visual-02's hard tiny pixels;
- the severe vertical-streak defect from attempt 01 is materially corrected;
- sampled bright-component mean width/height ratio improved from about 0.57 in attempt 01 to about 0.96 in attempt 02, consistent with screen-circular footprints;
- star positions and population structure remain the visual-02 deterministic distribution; no new time-dependent twinkle is present;
- halo energy is lower than rejected attempt 01 and no longer dominates the field;
- the field remains restrained enough to leave galactic/deep-sky structure as a distinct visual-04 domain;
- A_NORMAL composition, primary star, inhabited planet, station frame, crew, HUD, and controls remain intact;
- D_COLLAPSE remains coherent and readable with the revised point spread;
- no visible grid, lattice, network, fence, or wireframe was introduced;
- no Shard God naming/canon surface, replay, audio, accessibility, movement, fixed-outcome, or station-loss behavior was changed.

## Known blocker

### BUG-03-01: Exact canonical primary Shard God asset missing remotely

- Status: BLOCKED.
- Severity: high for numbered acceptance; unrelated to the stellar-sprite implementation.
- Required path: `assets/source-reference/shard-god/1761893423477.jpg.png`.
- Required SHA-256: `17fbbffea8e4e079295b0cd651dcccb4749d4548d209c9b1bdd74ae6d504ee73`.
- The candidate runner fallback is explicitly noncanonical and cannot be used for acceptance.

## Resweep verdict

**Candidate visual/runtime verdict: PASS.**

**Numbered acceptance verdict: BLOCKED by the exact canonical primary asset only.** Visual-03 remains uncounted; accepted campaign count stays **0 / 50**.
