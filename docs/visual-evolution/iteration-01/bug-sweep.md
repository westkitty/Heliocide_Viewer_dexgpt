# Visual-01 Candidate Bug Sweep

## Scope and proof level

Candidate-only sweep for revision one, `Cinematic color management foundation`. This sweep is not acceptance evidence because the exact canonical primary Shard God image is still absent from the repository and the GitHub runner used the explicitly documented ephemeral secondary-image fallback.

### Coverage map

- `src/visualRevision.js` revision-one activation and target mapping.
- `src/shaders.js` revision-one ACES-inspired filmic curve/output gamma path.
- `src/app.js`, `src/renderer.js`, `src/ui.js`, `src/timeline.js` affected runtime path.
- `scripts/typecheck.mjs`, `scripts/build.mjs`, `scripts/serve.mjs`, `scripts/cdp-capture.mjs` validation/capture path.
- GitHub Actions candidate run `32217585919` and artifact `9352864396`.
- Matched 1600x900 `before.png` / `after.png` at `A_NORMAL` and `candidate-neighbor.png` at `D_COLLAPSE`.
- Runtime JSON evidence for baseline, revision one, and neighbor state.

### Inaccessible / blocked coverage

- Exact canonical primary asset at `assets/source-reference/shard-god/1761893423477.jpg.png` is not present remotely.
- Hardware/GPU performance on a representative end-user machine is unverified; GitHub proof uses software-rendered WebGL.

## Confirmed bug ledger

### BUG-01: Remote capture command referenced a missing helper
- Status: fixed
- Severity: high
- Location / affected area: `scripts/capture.sh` -> `scripts/cdp-capture.mjs`
- Evidence: remote `main` originally contained `capture.sh` but not the helper it executed.
- Root cause / likely cause: local capture helper had not been committed with the bootstrap source tree.
- Exact fix required: restore the deterministic CDP helper to the target repository.
- Validation method: successful candidate Actions browser capture using the restored helper.
- Fix result: applied to `main` in preflight commit `d557ba116f85c70f77b263c6a274411821a9a733`.

### BUG-02: Chromium implicit favicon request polluted the first baseline capture as an error
- Status: fixed
- Severity: low
- Location / affected area: static server / browser error classification
- Evidence: baseline evidence recorded the sole browser error as `http://127.0.0.1:4173/favicon.ico` returning 404; application runtime errors were empty.
- Root cause / likely cause: Chromium automatically requested `/favicon.ico` while the static server returned 404.
- Exact fix required: serve a no-content favicon response and retain URL-aware browser error reporting.
- Validation method: rerun matched capture; all three capture return codes become zero and final proof gate passes.
- Fix result: applied to `main` in preflight commit `8389912f9ba628dc4143d59bde8b9996f5f6dcb9`.

### BUG-03: Exact canonical primary Shard God asset is missing from the repository
- Status: blocked
- Severity: high
- Location / affected area: `assets/source-reference/shard-god/1761893423477.jpg.png`
- Evidence: source validation fails without the runner-only fallback; Operational State records the exact Drive source and locked hash, but the remote path is absent.
- Root cause / likely cause: current connector paths cannot transfer the 1,305,402-byte exact binary without re-encoding/transcription risk.
- Exact fix required: publish the byte-identical primary with SHA-256 `17fbbffea8e4e079295b0cd651dcccb4749d4548d209c9b1bdd74ae6d504ee73` to the canonical path using a lossless first-party transfer path.
- Validation method: repository hash check plus full `npm run validate` with no fallback, then matched canonical screenshot run.
- Fix result: blocked; no substitution is permitted for acceptance.

## First visual/runtime sweep

- `npm ci`: PASS in candidate runner.
- Typecheck/contracts: PASS with explicit ephemeral candidate fallback.
- Tests: PASS.
- Build: PASS.
- Deterministic Chromium/WebGL startup: PASS.
- Baseline A_NORMAL capture: PASS after favicon repair.
- Revision-one A_NORMAL capture: PASS.
- Revision-one D_COLLAPSE neighbor capture: PASS.
- Application runtime error arrays: empty in accepted candidate evidence.
- Candidate status: `before_rc=0`, `after_rc=0`, `neighbor_rc=0`.

## Independent visual resweep

Direct inspection of the downloaded 1600x900 PNGs found:

- Camera/framing, HUD, crew silhouettes, planet position, stellar position, and station-window composition remain matched between before and after.
- Revision one removes the harsh clipped yellow stellar disc and produces a controlled pale-hot highlight rolloff.
- Planetary geography and ocean/land separation become materially more readable instead of remaining crushed in the shadows.
- Starfield remains restrained and stable; no atmospheric twinkle, grid, lattice, or neon/cyberpunk artifact was introduced.
- D_COLLAPSE remains coherent at the neighboring checkpoint; no layout, HUD, crew, or timeline regression is visible.
- No new Shard God naming, Siege Wall, replay, station-loss, or canon defect was introduced by the revision-one shader gate.

## Suspected risks

### RISK-01: GitHub software-render timing is not representative hardware proof
- Status: suspected
- Severity: low
- Evidence: runner identifies WebGL through Chromium software rendering.
- Required follow-up: retain project performance checkpoints on the available runner but do not equate them with device-tier thermals/GPU proof.

## Resweep verdict

**Candidate visual/runtime verdict: PASS.**

**Acceptance verdict: BLOCKED.** The revision-one visual change is good and the current candidate has no discovered regression that would reject it, but it cannot become `visual-01:` or count toward the fifty until BUG-03 is closed and the full acceptance sweep is rerun against the real canonical primary with no fallback.
