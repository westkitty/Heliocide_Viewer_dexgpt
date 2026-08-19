# Visual-04 Candidate Bug Sweep

## Scope and proof level

Candidate-only sweep for revision four, `Galactic / deep-sky structure`. This is not numbered acceptance evidence because the exact canonical primary Shard God reference is still absent remotely and the runner used the documented ephemeral secondary-reference fallback.

## Attempt history

### Attempt 01 — REJECTED

Run `32222568715`, artifact `9354439266`.

All technical/browser gates passed, but direct screenshot review rejected the visual result: the dormant revision-four block lifted most of the viewport into a broad violet veil that read as generic sci-fi fog and weakened black-sky contrast.

### Attempt 02 — candidate pass

The same iteration number was retained. The revision-four deep-sky block was replaced through the cumulative shader patch module with:

- a localized, gently curved stellar band;
- coarse and fine deterministic dust mottling;
- an explicit narrow dark dust lane;
- near-black navy / midnight-violet linear-light energy roughly an order of magnitude below the rejected veil;
- no added star density, no twinkle, and no later-domain exposure/postprocessing work.

Visual-02 deterministic distribution and visual-03 point-spread treatment remain carried forward unchanged.

## Coverage map

- `src/shaders.js`: cumulative proven visual-02 source.
- `src/shaderRevisionPatch.js`: visual-03 point-spread patch plus bounded visual-04 deep-sky replacement.
- `src/renderer.js`: patched shader-source route.
- `src/visualRevision.js`: revision four and target mapping.
- `src/app.js`, `src/timeline.js`, `src/ui.js`: deterministic revision/checkpoint, phase, HUD, crew, controls.
- `scripts/cdp-capture.mjs`: bounded capture lifecycle with completed-target cleanup.
- Authoritative run `32222861051` and artifact `9354557303`.
- Direct 1600x900 review of revision-three A_NORMAL before, revision-four A_NORMAL after, and revision-four D_COLLAPSE neighbor.

## Technical sweep

- `npm ci`: PASS.
- Typecheck/contracts: PASS with documented candidate-only asset fallback.
- Tests: PASS.
- Build: PASS.
- Exact shader-patch target assertions: PASS through module evaluation/build/runtime.
- Deterministic Chromium/WebGL startup: PASS.
- Revision-three A_NORMAL before capture: PASS.
- Revision-four A_NORMAL after capture: PASS.
- Revision-four D_COLLAPSE neighbor capture: PASS.
- Candidate status: `before_rc=0`, `after_rc=0`, `neighbor_rc=0`.
- Application runtime errors: none.
- Browser errors: none.
- Completed CDP targets closed successfully; no third-capture regression observed.

## Performance screen

GitHub software WebGL only:

- before p50/p95/p99: 16.5 / 19.5 / 19.7 ms;
- after p50/p95/p99: 16.5 / 17.1 / 17.3 ms;
- D_COLLAPSE neighbor p50/p95/p99: 16.6 / 19.4 / 19.5 ms.

No candidate performance regression is visible in this environment. Representative hardware GPU performance remains unverified.

## Independent visual resweep

Direct review found:

- the rejected full-frame violet wash is gone;
- most physical sky remains near-black, with a subtle low-energy deep-sky band crossing the middle field;
- the band is spatially structured rather than uniform: coarse/fine mottling is visible and an interrupted dark lane breaks its center;
- amplified difference inspection confirms the change is concentrated through the middle half of the sky rather than behaving as a global tint;
- the treatment remains restrained and celestial rather than neon, cyberpunk, or dashboard-like;
- visual-02 star positions/population and visual-03 compact point-spread treatment remain legible and stable;
- no atmospheric twinkle, temporal star noise, visible grid, lattice, network, fence, or wireframe is introduced;
- A_NORMAL primary star, planet, station framing, three crew, HUD, controls, and black-sky contrast remain coherent;
- D_COLLAPSE remains readable and does not acquire generic fog or destructive color wash;
- no Shard God naming/canon surface, replay, input, audio, accessibility, fixed outcome, or station-loss behavior was changed.

## Known blocker

### BUG-04-01: Exact canonical primary Shard God asset missing remotely

- Status: BLOCKED.
- Severity: high for numbered acceptance; unrelated to the deep-sky implementation.
- Required path: `assets/source-reference/shard-god/1761893423477.jpg.png`.
- Required SHA-256: `17fbbffea8e4e079295b0cd651dcccb4749d4548d209c9b1bdd74ae6d504ee73`.
- Candidate runner fallback is explicitly noncanonical and cannot be used for acceptance.

## Resweep verdict

**Candidate visual/runtime verdict: PASS.**

**Numbered acceptance verdict: BLOCKED by the exact canonical primary asset only.** Visual-04 remains uncounted; accepted campaign count stays **0 / 50**.
