# Operational State

## Project identity and authority

- Project ID: `heliocide-viewer-dexgpt`
- Authoritative repository: `westkitty/Heliocide_Viewer_dexgpt`
- Authoritative delivery branch: `main`
- Final implementation owner: `threejs-project-engineer`
- `westkitty/Heliocide_Viewer` is explicitly forbidden. Do not read, inspect, compare, fetch, branch, commit, push, or otherwise interact with it.
- No force-push, history rewrite, public deployment, or unrelated repository changes.

## Campaign contract

- Mission: minimum fifty accepted, separate, remotely verified visual iterations.
- Accepted numbered commits must be exactly `visual-01:` through `visual-50:` on `main`, one accepted iteration per commit.
- Preflight/tooling/state commits do not count.
- Rejected or candidate work does not count and must not advance the accepted count.
- Every accepted iteration requires matched visual evidence, source validation, runtime proof, bug sweep, canon/naming checks, acceptable performance, push to `main`, and remote verification.
- Accepted visual iterations: **0 / 50**.

## Current main baseline

- Capture command waits are bounded; software-render screenshot capture has a separate 45-second ceiling.
- `scripts/cdp-capture.mjs` now closes each completed Chromium CDP target after evidence is written so sequential software-WebGL captures do not accumulate rendering tabs. Pre-state-reconciliation helper repair commit: `dbd058d70ba29eaa9297d1b2e78d5b3d9e0b6a70`.
- Candidate workflow is serialized per `dexgpt-visual-*` branch with stale runs cancelled so evidence commits cannot race each other.
- `scripts/capture.sh` has its required `scripts/cdp-capture.mjs` helper in the target repository.
- `scripts/serve.mjs` suppresses Chromium's implicit favicon error with a no-content response.
- `.github/workflows/dexgpt-visual-candidate-runner.yml` performs `npm ci`, full validation, deterministic Chromium/WebGL startup, matched 1600x900 captures, artifact upload, evidence persistence, and proof enforcement.
- `assets/source-reference/shard-god/1763713752850.jpg` is present as the exact canonical secondary reference.

## Canonical primary asset blocker

- Required path: `assets/source-reference/shard-god/1761893423477.jpg.png`.
- Exact source remains available through the user's connected Google Drive, file ID `1JQGkyUBru2yDz0UZKCjqpakdin6gl20m`, size `1,305,402` bytes.
- Exact source SHA-256: `17fbbffea8e4e079295b0cd651dcccb4749d4548d209c9b1bdd74ae6d504ee73`.
- Canonical decoded RGBA pixel SHA-256 used during exactness probes: `77e5efea67ae7e6150667c49dc81089a884c99a3df726626f0816ecdea5d4981`.
- The exact primary is **not yet published in the repository**.
- Canva/public-view and direct Canva IFS recovery paths were tested and rejected by exact hash gates.
- Manual/base64 transcription was rejected as unsafe after Git blob SHA mismatches.
- Current execution environment has no usable SSH client/credentials bridge to BigMac.
- Do not substitute, re-encode, approximate, or claim the primary is present.
- Candidate runner may use an explicitly documented **ephemeral runner-only** copy of the exact secondary at the primary path only to test visual domains unrelated to dossier fidelity. That fallback never counts as acceptance evidence.

## Visual-01 candidate

- Branch: `dexgpt-visual-01-candidate`; draft PR `#2` closed and unmerged.
- Target: cinematic color-management foundation.
- Successful run: `32217585919`; artifact `9352864396`.
- Source validation, build, browser startup, matched A_NORMAL before/after, D_COLLAPSE neighbor, direct screenshot review, and candidate bug sweep passed.
- Direct review found materially improved stellar highlight rolloff and planetary readability without composition or neighbor-state regression.
- Verdict: **CANDIDATE PASS / NUMBERED ACCEPTANCE BLOCKED**.
- Count contribution: **0**.

## Visual-02 candidate

- Branch: `dexgpt-visual-02-candidate`; draft PR `#3` closed and unmerged.
- Target: deterministic astronomical star distribution.
- Attempt 01: **REJECTED** despite green CI because direct 1600x900 review found an effectively invisible visual delta.
- Attempt 02 implementation head: `24b977e222b4ba2b8b6b154e71a951786c015982`.
- Attempt 02 uses deterministic two-scale populations, irregular cell jitter, and broad deterministic density variation with no time-dependent twinkle, galactic haze, or revision-three halo work.
- Authoritative clean run: `32220732828`; artifact `9353868353`.
- Validation, browser proof, A_NORMAL before/after, D_COLLAPSE neighbor, direct screenshot inspection, metrics, and bug sweep passed.
- Verdict: **CANDIDATE PASS / NUMBERED ACCEPTANCE BLOCKED**.
- Count contribution: **0**.

## Visual-03 candidate

- Branch: `dexgpt-visual-03-candidate`; draft PR `#4` closed and unmerged.
- Target: high-quality stellar sprite shader.
- Attempt 01: **REJECTED**. Valid before/after frames exposed strongly vertical stellar streaks and an over-broad Gaussian halo; the third capture also failed because completed CDP targets were not being closed.
- Generic target-cleanup repair was applied separately to `main` and then carried into the candidate.
- Attempt 02 preserves visual-02 positions/population and applies a bounded revision-three-only shader source patch: screen-aspect compensation plus reduced Gaussian core/halo footprint and energy.
- Attempt-02 evaluation head: `2a0308912e57b734326ff4cafd5f5353a97ff315`.
- Authoritative successful workflow: run `32221960801`, attempt 2; artifact `9354263130`.
- Full validation, browser startup, A_NORMAL revision-two before, A_NORMAL revision-three after, D_COLLAPSE revision-three neighbor, runtime/browser error checks, artifact persistence, and final proof gate passed.
- A first run on the same source SHA had a transient Chromium startup failure before any app page opened; unchanged rerun passed, so no source mutation was attributed to that failure.
- Direct review found compact stellar point-spread functions with restrained halos and preserved distribution. Sampled bright-component mean width/height ratio improved from about 0.57 in rejected attempt 01 to about 0.96 in attempt 02, consistent with near-circular screen footprints.
- Software-WebGL timing: matched before p95 17.9 ms; after p95 19.5 ms; D_COLLAPSE p95 18.2 ms. Treat as regression screening, not representative hardware-GPU proof.
- Candidate report, metrics, rejected-attempt record, and bug sweep are stored under `docs/visual-evolution/iteration-03/` on the candidate branch.
- Verdict: **CANDIDATE PASS / NUMBERED ACCEPTANCE BLOCKED**.
- Count contribution: **0**.

## Protected invariants

- Runtime identity is exactly `Shard God`; legacy aliases are forbidden in current authored/runtime identity surfaces.
- Physical Siege Wall sky is an irregular expanding swath of starless blackness, never a visible lattice/grid/web/fence/network.
- Tactical displays may abstract geometry but must identify that abstraction as non-physical sky.
- Observer remains Administration station HV-88; no combat and no player ability to stop the heliocide.
- Preserve deterministic phases A through H, replay, movement/look, console, accessibility, audio behavior, station/planet/star/orbital infrastructure, and `CONTAINMENT ACHIEVED`.
- Death is final; no ghosts or trapped-consciousness afterlife.
- Shard God remains controlled, strategic, cold, deliberate, and containment-driven rather than chaotic or retaliatory.

## Validation policy

- Old reports are evidence history, not current runtime proof.
- Use fresh `npm ci`, typecheck/contracts, tests, build, real browser runtime, console/error inspection, deterministic screenshots, and affected-neighbor captures for each candidate/accepted iteration.
- Screenshot visual inspection is mandatory; pixel/component statistics are supplemental only.
- Bug sweep follows each visual iteration attempt before candidate pass/acceptance.
- Performance checkpoint every five **accepted** iterations; project-health checkpoint every ten **accepted** iterations; both final.
- Do not claim an iteration accepted, pushed, or complete unless the corresponding evidence exists on the exact remote `main` state.

## Current next action

1. Continue cumulative candidate engineering with visual-04, `Galactic / deep-sky structure`, carrying the proven visual-02 distribution and visual-03 sprite treatment forward.
2. Compare revision three to revision four at the same A_NORMAL checkpoint and use D_COLLAPSE as a neighbor check; reject the attempt if the background reads like generic fog, neon sci-fi, or a visually negligible haze.
3. Keep all candidate work uncounted until the exact canonical primary is published and the acceptance gate can run with no fallback.
4. Once exact primary transfer is solved, rerun visual-01 acceptance against real canon, create the atomic `visual-01:` commit only after every gate passes, remotely verify it, then replay the already-proven candidate deltas sequentially into numbered acceptance commits without skipping required proof.
