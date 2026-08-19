# Visual-05 Candidate Bug Sweep

## Scope and proof level

Candidate-only sweep for revision five, `Starfield stability / antialiasing`. This is not numbered acceptance evidence because the exact canonical primary Shard God reference is still absent remotely and the runner used the documented ephemeral secondary-reference fallback.

## Attempt history

### Attempt 01 — REJECTED

Run `32223565101`, artifact `9354816760`.

All ordinary and stability capture gates passed, but the controlled yaw probe showed the heuristic derivative minimum-radius treatment did not improve subpixel sampling. After subpixel registration, revision-five high-frequency/bright-star residuals were worse than revision four and integrated high-frequency energy drift moved from about -3.03% to -4.64%.

### Attempt 02 — candidate pass

The same iteration number was retained. Revision-five sampling now approximates convolution of the visual-03 Gaussian point-spread function with the fragment pixel footprint:

- derive core variance from the existing core Gaussian;
- derive halo variance from the existing halo Gaussian;
- estimate pixel-box variance from `fwidth` of the screen-corrected star coordinates;
- add pixel variance to the Gaussian variance;
- normalize amplitude by base/effective variance to approximately conserve two-dimensional energy;
- preserve positions, density, temperature colors, deep-sky structure, and all revision-three/four formulas when revision < 5.

Visual-06 exposure integration remains untouched.

## Coverage map

- `src/shaders.js`: cumulative visual-02 distribution source.
- `src/shaderRevisionPatch.js`: visual-03 point-spread, visual-04 deep-sky, visual-05 pixel-footprint integration.
- `src/renderer.js`: patched shader-source route.
- `src/visualRevision.js`: revision five and target mapping.
- `scripts/cdp-capture.mjs`: deterministic optional yaw override plus completed-target cleanup.
- Base candidate workflow: normal before/after/neighbor plus visual-05-only yaw=0.02 shifted pair.
- Authoritative run `32224010941`, artifact `9354949445`.
- Direct review of all five 1600x900 frames.
- Supplemental phase-correlation/high-pass stability analysis of a clean dark-sky crop.

## Technical sweep

- `npm ci`: PASS.
- Typecheck/contracts: PASS with documented candidate-only asset fallback.
- Tests: PASS.
- Build: PASS.
- Exact shader patch assertions: PASS through module evaluation/build/runtime.
- Deterministic Chromium/WebGL startup: PASS.
- Revision-four A_NORMAL before capture: PASS.
- Revision-five A_NORMAL after capture: PASS.
- Revision-five D_COLLAPSE neighbor: PASS.
- Revision-four yaw=0.02 stability capture: PASS.
- Revision-five yaw=0.02 stability capture: PASS.
- Application runtime errors: none.
- Browser errors: none.
- All five capture return codes: zero.

## Stability evidence

After phase-correlation registration of the same dark-sky crop:

- high-frequency mean absolute residual falls from 0.08410 in revision four to 0.07639 in revision five, about a 9.2% reduction;
- bright-star residual falls from 11.72 to 8.07, about a 31.1% reduction;
- phase-correlation response improves from about 0.968 to 0.977;
- integrated positive high-frequency energy drift remains close to baseline: -3.46% in revision five versus -3.03% in revision four, a 0.43 percentage-point difference.

The first three measures directly improve subpixel image stability; the energy drift remains in the same small range rather than indicating a brightness-population regression.

## Performance screen

GitHub software WebGL only:

- before p50/p95/p99: 16.5 / 17.6 / 19.3 ms;
- after p50/p95/p99: 16.4 / 17.2 / 17.5 ms;
- D_COLLAPSE neighbor p50/p95/p99: 16.4 / 17.2 / 18.0 ms;
- shifted revision-four p95: 17.1 ms;
- shifted revision-five p95: 17.6 ms.

No material candidate performance regression is visible. Representative hardware GPU performance remains unverified.

## Independent visual resweep

Direct review found:

- the revision-five still frame preserves visual-04 black-sky/deep-sky balance and visual-03 compact star identity;
- no visible blur bloom, star enlargement, grid, line, smear, or density change was introduced;
- the yaw-shifted revision-five field remains visually coherent rather than showing obvious star dropout/flicker artifacts;
- visual-02 deterministic population, visual-03 temperature/point-spread character, and visual-04 band/dust lane remain intact;
- A_NORMAL primary star, planet, station architecture, three crew, HUD, controls, and black-sky contrast are preserved;
- D_COLLAPSE remains coherent;
- no Siege Wall lattice/network/grid, Shard God naming/canon defect, replay/input/audio/accessibility regression, or fixed-outcome change was introduced.

## Known blocker

### BUG-05-01: Exact canonical primary Shard God asset missing remotely

- Status: BLOCKED.
- Severity: high for numbered acceptance; unrelated to starfield stability implementation.
- Required path: `assets/source-reference/shard-god/1761893423477.jpg.png`.
- Required SHA-256: `17fbbffea8e4e079295b0cd651dcccb4749d4548d209c9b1bdd74ae6d504ee73`.
- Candidate runner fallback is explicitly noncanonical and cannot be used for acceptance.

## Resweep verdict

**Candidate visual/runtime/stability verdict: PASS.**

**Numbered acceptance verdict: BLOCKED by the exact canonical primary asset only.** Visual-05 remains uncounted; accepted campaign count stays **0 / 50**.
