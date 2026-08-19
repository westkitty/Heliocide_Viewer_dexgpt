# Visual-05 Candidate Report

## Target

`Starfield stability / antialiasing`

Branch: `dexgpt-visual-05-candidate`

Attempt-two implementation head evaluated: `fb3f7210965f859c696c3c1c01a8ef33ebff1735`

Authoritative GitHub Actions run: `32224010941`

Artifact: `visual-candidate-05-32224010941` / `9354949445`

Checkpoint: `A_NORMAL`

Neighbor: `D_COLLAPSE`

Stability probe: matched revision-four/revision-five `A_NORMAL` captures with deterministic `yaw=0.02` override in addition to the normal yaw-zero before/after frames.

Asset fallback: primary Shard God reference substituted with the exact secondary reference **only inside the ephemeral runner workspace**. This makes the evidence candidate-only and prevents numbered acceptance.

## Attempt history

Attempt 01 passed every technical gate but was rejected by the new stability probe. A heuristic derivative minimum-radius treatment softened the still image but did not improve subpixel sampling after motion registration.

Attempt 02 retained the same iteration number and replaced the heuristic with an energy-conserving pixel-footprint Gaussian approximation: pixel-box variance from shader derivatives is convolved with the existing core/halo variance, and peak amplitude is normalized by base/effective variance. Earlier revision formulas remain intact when revision < 5.

## Observable before / after

At yaw zero, revision five preserves the visual-04 composition and star character rather than visibly enlarging or blurring the field. The meaningful improvement appears under controlled fractional camera motion: after subpixel registration, star residuals are materially lower in revision five.

In a clean dark-sky crop:

- aligned high-frequency mean absolute residual improves from 0.08410 to 0.07639, about 9.2%;
- aligned bright-star residual improves from 11.72 to 8.07, about 31.1%;
- phase-correlation response improves from about 0.968 to 0.977;
- integrated positive high-frequency energy drift stays close to baseline (-3.46% versus -3.03%).

The D_COLLAPSE neighbor remains coherent.

## Physical / technical improvement

- Subpixel star motion is sampled more consistently instead of being judged only at pixel centers.
- The existing visual-03 Gaussian identity is preserved; revision five changes integration, not artistic star size or population.
- Approximate two-dimensional energy conservation avoids turning antialiasing into uncontrolled bloom.
- No temporal twinkle, stochastic frame noise, exposure adaptation, or visual-06 work is introduced.

## Validation

- `npm ci`: PASS.
- Typecheck/contracts: PASS with documented candidate-only asset fallback.
- Tests: PASS.
- Build: PASS.
- Shader patch exact-target assertions: PASS.
- Deterministic Chromium/WebGL startup: PASS.
- A_NORMAL revision-four before capture: PASS.
- A_NORMAL revision-five after capture: PASS.
- D_COLLAPSE revision-five neighbor capture: PASS.
- Revision-four yaw=0.02 stability capture: PASS.
- Revision-five yaw=0.02 stability capture: PASS.
- Runtime errors: none.
- Browser errors: none.
- All five capture return codes: zero.
- Direct screenshot inspection: PASS.
- Stability analysis: PASS.
- Bug sweep: PASS at candidate level.
- GitHub software-WebGL timing: before p95 17.6 ms, after p95 17.2 ms, neighbor p95 17.2 ms; no material candidate regression observed. This is regression-screening data, not representative hardware GPU proof.

## Improvement score

Before total: 34 / 40.

After total: 35 / 40.

Improved dimension: technical sampling stability. No scored dimension regressed.

## Verdict

**CANDIDATE PASS.**

**NUMBERED ACCEPTANCE BLOCKED.** The exact canonical primary Shard God image is still missing at `assets/source-reference/shard-god/1761893423477.jpg.png`, so this work cannot be committed as `visual-05:` and does not count toward the fifty accepted iterations. Accepted count remains **0 / 50**.
