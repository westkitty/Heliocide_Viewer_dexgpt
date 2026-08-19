# Visual-02 Candidate Bug Sweep

## Scope and proof level

Candidate-only sweep for `Deterministic astronomical star distribution`, revision two. This does **not** count as an accepted numbered iteration because the exact canonical primary Shard God reference is still absent remotely and the candidate runner used the documented ephemeral secondary-reference fallback.

## Attempt history

- Attempt 01: **REJECTED**. Technical gates passed, but direct inspection showed the revision-one/revision-two field was visually indistinguishable. See `rejected-attempt-01.md`.
- Attempt 02: refined the same domain with deterministic, two-scale star populations, irregular cell jitter, and broad deterministic density variation. No time-dependent twinkle, galactic haze, or revision-three halo work was introduced.

## Coverage map

- `src/shaders.js`: revision-two star distribution path plus protected revision-one fallback.
- `src/visualRevision.js`: revision remains two and maps to the correct target.
- `src/app.js`, `src/renderer.js`: deterministic revision/checkpoint plumbing and WebGL render path.
- `src/timeline.js`, `src/ui.js`: protected phase/HUD/crew behavior at A_NORMAL and D_COLLAPSE.
- `scripts/typecheck.mjs`, build/test scripts, static server, and bounded CDP capture helper.
- GitHub Actions authoritative run `32220732828`.
- Artifact `visual-candidate-02-32220732828`, ID `9353868353`.
- Direct visual inspection of 1600x900 `before.png`, `after.png`, and `candidate-neighbor.png`.

## Technical sweep

- `npm ci`: PASS.
- Typecheck/contracts: PASS with explicit ephemeral candidate asset fallback.
- Tests: PASS.
- Build: PASS.
- Deterministic Chromium/WebGL startup: PASS.
- Revision-one A_NORMAL before capture: PASS.
- Revision-two A_NORMAL after capture: PASS.
- Revision-two D_COLLAPSE neighbor capture: PASS.
- Candidate status: `before_rc=0`, `after_rc=0`, `neighbor_rc=0`.
- Application runtime errors: none.
- Browser errors: none.
- Candidate after timing: p50 16.5 ms, p95 17.2 ms, p99 17.2 ms on GitHub software WebGL.
- D_COLLAPSE neighbor timing: p50 16.5 ms, p95 17.1 ms, p99 17.2 ms.
- No observed performance regression against the candidate before capture.

## Visual / gameplay sweep

Direct review found:

- Revision two now creates an observable richer stellar field with a sparse primary population and finer subordinate population; the improvement is visible without zooming or relying on pixel diff.
- Spatial population remains irregular rather than forming rows, a visible grid, or a uniform wallpaper texture.
- Stars remain static at the deterministic checkpoint; no atmospheric twinkle or temporal noise was added.
- Visual-03 remains available as a distinct improvement domain: revision two still uses simple smooth point cores; Gaussian core/halo treatment remains gated behind revision three.
- Visual-04 remains available as a distinct improvement domain: no Milky-Way-like band, dust lane, nebular haze, or deep-sky background structure was added here.
- The planet, primary star, station framing, crew positions, HUD, and controls preserve the matched A_NORMAL composition.
- D_COLLAPSE remains coherent with the denser star population; no collapse, crew, HUD, timeline, or station-layout regression is visible.
- No visible Siege Wall geometry, lattice, network, grid, fence, or wireframe was introduced.
- No Shard God naming or canon surface was changed by this iteration.
- No replay, input, audio, accessibility, station-loss, or fixed-outcome behavior was changed by this iteration.

## Supplemental visual delta

The direct visual verdict is primary. Supplemental measurements between matched A_NORMAL frames:

- Mean absolute RGB delta: about 0.0341.
- 667 pixels changed by more than two RGB levels in at least one channel.
- 624 of those materially changed pixels were in dark-background regions.
- 577 pixels changed by more than ten RGB levels.

This is a material increase over rejected attempt 01, which changed only about two dozen background pixels at a comparable threshold.

## Known blocker

### BUG-02-01: Exact canonical primary Shard God asset missing remotely
- Status: BLOCKED.
- Severity: high for acceptance; unrelated to this star-distribution implementation.
- Required path: `assets/source-reference/shard-god/1761893423477.jpg.png`.
- Required SHA-256: `17fbbffea8e4e079295b0cd651dcccb4749d4548d209c9b1bdd74ae6d504ee73`.
- Candidate runner fallback is explicitly noncanonical and cannot be used for acceptance.
- Required follow-up: publish the exact bytes through a lossless first-party path, rerun acceptance with no fallback, then create the atomic numbered commit only if all gates still pass.

## Resweep verdict

**Candidate visual/runtime verdict: PASS.**

**Acceptance verdict: BLOCKED by the exact canonical primary asset only.** Visual-02 remains uncounted; accepted campaign count stays **0 / 50**.
