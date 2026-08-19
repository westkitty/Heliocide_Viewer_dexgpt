# Operational State

## Project identity and authority

- Project ID: `heliocide-viewer-dexgpt`
- Authoritative repository: `westkitty/Heliocide_Viewer_dexgpt`
- Authoritative delivery branch: `main`
- Final implementation owner: `threejs-project-engineer`
- `westkitty/Heliocide_Viewer` is explicitly forbidden. Do not read, inspect, compare, fetch, branch, commit, push, or otherwise interact with it.
- No force-push, history rewrite, public deployment, or unrelated repository changes.

## Current campaign contract

- Mission: minimum fifty accepted, separate, remotely verified visual iterations.
- Accepted numbered commits must be exactly `visual-01:` through `visual-50:` on `main`, one accepted iteration per commit.
- Preflight/tooling/state commits do not count.
- Rejected or candidate work does not count and must not advance the accepted count.
- Every accepted iteration requires matched visual evidence, source validation, runtime proof, bug sweep, canon/naming checks, acceptable performance, push to `main`, and remote verification.
- Accepted visual iterations: **0 / 50**.

## Current main baseline

- Pre-state-file capture-helper repair: `d557ba116f85c70f77b263c6a274411821a9a733`.
- CDP command waits are bounded; software-render screenshot capture has a separate 45-second ceiling rather than an unbounded wait.
- Candidate workflow is serialized per `dexgpt-visual-*` branch with stale runs cancelled so evidence commits cannot race each other.
- `scripts/capture.sh` has its required `scripts/cdp-capture.mjs` helper in the target repository.
- `scripts/serve.mjs` suppresses Chromium's implicit favicon error with a no-content response.
- `.github/workflows/dexgpt-visual-candidate-runner.yml` performs `npm ci`, full validation, deterministic Chromium/WebGL startup, matched 1600x900 captures, artifact upload, evidence persistence, and proof enforcement.
- `assets/source-reference/shard-god/1763713752850.jpg` is present as the exact canonical secondary reference.
- Main head immediately before this state reconciliation: `5b3ffde7048f046b5e7708b1d7ea053c5eee3f8f` (`preflight: serialize visual candidate runs`).

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

## Visual-01 candidate evidence

- Candidate branch: `dexgpt-visual-01-candidate`.
- Draft trigger PR `#2` is closed and unmerged.
- Candidate change: activate the revision-one ACES-inspired cinematic color-management curve.
- Successful clean candidate run: `32217585919`; artifact ID `9352864396`.
- Full source validation, build, browser startup, matched A_NORMAL before/after, D_COLLAPSE neighbor, artifact persistence, direct screenshot inspection, and candidate bug sweep passed.
- Direct review found materially improved stellar highlight rolloff and planetary readability without composition or neighbor-state regression.
- Verdict: **CANDIDATE PASS / NUMBERED ACCEPTANCE BLOCKED**.
- Visual-01 remains **not counted**.

## Visual-02 candidate evidence

- Candidate branch: `dexgpt-visual-02-candidate`.
- Draft trigger PR `#3` is closed and unmerged.
- Target: deterministic astronomical star distribution.
- Attempt 01: **REJECTED** despite green CI because direct 1600x900 review found an effectively invisible visual delta; same iteration number was retained.
- Attempt 02 implementation head: `24b977e222b4ba2b8b6b154e71a951786c015982`.
- Attempt 02 replaces the weak single-grid threshold adjustment with deterministic two-scale populations, irregular cell jitter, and broad deterministic density variation. It introduces no time-dependent twinkle, galactic haze, or revision-three halo work.
- Authoritative clean run: `32220732828`; artifact ID `9353868353`.
- Full source validation, tests/build, deterministic browser startup, revision-one A_NORMAL before capture, revision-two A_NORMAL after capture, D_COLLAPSE neighbor, artifact upload, evidence persistence, and final proof gate passed.
- Direct screenshot inspection found an obvious richer but restrained irregular stellar population, preserved primary composition, and coherent D_COLLAPSE neighbor.
- After timing on GitHub software WebGL: p50 16.5 ms, p95 17.2 ms, p99 17.2 ms; neighbor p95 17.1 ms. This is evidence for regression screening only, not representative hardware-GPU proof.
- Candidate bug sweep and metrics are recorded under `docs/visual-evolution/iteration-02/` on the candidate branch.
- Verdict: **CANDIDATE PASS / NUMBERED ACCEPTANCE BLOCKED**.
- Visual-02 remains **not counted**.

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
- Screenshot visual inspection is mandatory; pixel statistics are supplemental only.
- Bug sweep follows each visual iteration attempt before candidate pass/acceptance.
- Performance checkpoint every five **accepted** iterations; project-health checkpoint every ten **accepted** iterations; both final.
- Do not claim an iteration accepted, pushed, or complete unless the corresponding evidence exists on the exact remote `main` state.

## Current next action

1. Continue sequential candidate engineering with visual-03, `High-quality stellar sprite shader`, starting from current `main` while carrying the successful visual-01 and visual-02 candidate behavior into the candidate comparison path.
2. Keep all candidate work uncounted until the exact canonical primary is published and the acceptance gate can run with no fallback.
3. On each candidate, reject visually negligible changes even if technical CI is green; retain the same iteration number until the target visibly improves.
4. Once exact primary transfer is solved, rerun visual-01 acceptance against real canon, run its final bug sweep, create the atomic `visual-01:` commit on `main`, remotely verify it, and then replay the already-proven candidate deltas sequentially into numbered acceptance commits without skipping any required proof.
