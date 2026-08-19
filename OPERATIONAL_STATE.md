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
- Rejected or candidate work does not count and must not advance the iteration number.
- Every accepted iteration requires matched visual evidence, source validation, runtime proof, bug sweep, canon/naming checks, acceptable performance, push to `main`, and remote verification.
- Accepted visual iterations: **0 / 50**.

## Current baseline

- Pre-state-file `main` baseline: `d557ba116f85c70f77b263c6a274411821a9a733` (`preflight: restore remote CDP capture helper`).
- Remote capture harness is now structurally repaired: `scripts/capture.sh` has `scripts/cdp-capture.mjs` available.
- `scripts/serve.mjs` returns a no-content favicon response so Chromium's implicit `/favicon.ico` request does not create false runtime-error noise.
- `.github/workflows/dexgpt-visual-candidate-runner.yml` is registered on `main` for same-repository `dexgpt-visual-*` draft-PR candidate validation.
- Candidate runner performs `npm ci`, `npm run validate`, deterministic Chromium/WebGL startup, matched 1600x900 captures, evidence persistence, and artifact upload.
- `assets/source-reference/shard-god/1763713752850.jpg` is present as the exact canonical secondary reference.

## Canonical primary asset blocker

- Required path: `assets/source-reference/shard-god/1761893423477.jpg.png`.
- Exact source remains available through the user's connected Google Drive, file ID `1JQGkyUBru2yDz0UZKCjqpakdin6gl20m`, size `1,305,402` bytes.
- Exact source SHA-256: `17fbbffea8e4e079295b0cd651dcccb4749d4548d209c9b1bdd74ae6d504ee73`.
- Canonical decoded RGBA pixel SHA-256 used during exactness probes: `77e5efea67ae7e6150667c49dc81089a884c99a3df726626f0816ecdea5d4981`.
- The exact primary is **not yet published in the repository**.
- Canva/public-view and direct Canva IFS recovery paths were tested and rejected by exact hash gates.
- Manual/base64 transcription was rejected as unsafe after Git blob SHA mismatches.
- Current environment has no usable SSH client/credentials bridge to BigMac.
- Do not substitute, re-encode, approximate, or claim the primary is present.

## Visual-01 candidate evidence

- Candidate branch: `dexgpt-visual-01-candidate`.
- Draft trigger PR: `#2`; it must not be merged.
- Candidate change: activate the already-authored revision-one ACES-inspired cinematic color-management curve (`VISUAL_REVISION` zero to one).
- Candidate runner uses an explicit **ephemeral runner-only** secondary-reference copy at the primary path solely so unrelated visual code can be measured. That fallback is never committed and is not acceptance evidence.
- Successful candidate run: GitHub Actions run `32217585919`.
- Evidence artifact: `visual-candidate-01-32217585919`, artifact ID `9352864396`.
- Source validation, build, deterministic browser startup, matched A_NORMAL before/after capture, D_COLLAPSE neighbor capture, evidence upload, persistence, and final proof gate all passed.
- Direct screenshot review found the revision-one tone curve materially improves highlight rolloff and planetary readability while preserving composition; D_COLLAPSE remains coherent.
- Candidate timing on GitHub software-rendered WebGL stayed approximately flat (A_NORMAL p95 around 17 ms; D_COLLAPSE p95 around 17 ms).
- Verdict: **candidate PASS, acceptance BLOCKED by missing exact canonical primary**.
- Visual-01 remains **not counted**.

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
- Bug sweep follows each visual iteration attempt before acceptance.
- Performance checkpoint every five accepted iterations; project-health checkpoint every ten accepted iterations; both final.
- Do not claim an iteration accepted, pushed, or complete unless the corresponding evidence exists on the exact remote `main` state.

## Current next action

1. Close visual-01 draft trigger PR `#2` without merge; preserve the candidate branch/evidence as history.
2. Continue visual engineering in candidate mode from current repaired `main`, beginning with visual-02 in the same starfield domain.
3. Keep candidate work uncounted until the exact canonical primary is published and the acceptance gate can run without fallback.
4. Once exact primary transfer is solved, rerun visual-01 acceptance against real canon, run its bug sweep, create the atomic `visual-01:` commit on `main`, remotely verify it, then proceed sequentially.
