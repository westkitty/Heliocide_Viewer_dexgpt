# Visual-03 Candidate Report

## Target

`High-quality stellar sprite shader`

Branch: `dexgpt-visual-03-candidate`

Revision-three repair head evaluated by the authoritative retry: `2a0308912e57b734326ff4cafd5f5353a97ff315`

Authoritative GitHub Actions run: `32221960801`, attempt 2

Artifact: `visual-candidate-03-32221960801` / `9354263130`

Checkpoint: `A_NORMAL`

Neighbor: `D_COLLAPSE`

Asset fallback: primary Shard God reference substituted with the exact secondary reference **only inside the ephemeral runner workspace**. This makes the evidence candidate-only and prevents numbered acceptance.

## Attempt history

Attempt 01 was rejected. Although the revision-three A_NORMAL frame rendered, direct review found strongly vertical stellar streaks and an over-broad Gaussian halo. Its D_COLLAPSE third capture also failed because completed Chromium targets were accumulating under software WebGL.

The generic capture helper was repaired separately to close completed targets. Attempt 02 retains the exact visual-02 population source and applies a bounded revision-three-only shader source transformation that corrects screen aspect and reduces Gaussian core/halo energy.

A first attempt-02 CI run had a transient Chromium startup failure before any app page opened. The source was unchanged; rerunning the failed job on the same SHA passed browser startup and every subsequent gate.

## Observable before / after

Before, visual-02 uses deterministic but hard-edged tiny point cores. After, the same stellar population reads as luminous astronomical points with compact Gaussian cores and restrained halos. The positions and population structure are preserved; the visual change is in the point-spread function rather than a hidden density increase.

The rejected attempt-one vertical streaking is materially corrected. In a consistent dark-sky component sample, the mean bright-component width/height ratio moved from approximately 0.57 in attempt one to 0.96 in attempt two, matching the direct visual impression of near-circular stellar footprints.

The primary star, inhabited planet, station architecture, three crew figures, HUD, and camera framing remain matched. D_COLLAPSE also remains coherent.

## Physical / artistic improvement

- Compact point-spread functions replace hard sub-pixel/smoothstep star points.
- Temperature color remains visible without turning the field into generic neon.
- Halo footprint is restrained enough to preserve black sky and leave deep-sky structure for visual-04.
- No atmospheric twinkle or time-dependent star motion is introduced.
- No star-population rewrite is smuggled into visual-03; visual-02 distribution remains authoritative for this candidate.

## Validation

- `npm ci`: PASS.
- Typecheck/contracts: PASS with documented candidate-only asset fallback.
- Tests: PASS.
- Build: PASS.
- Shader patch exact-target assertion: PASS.
- Deterministic Chromium/WebGL startup: PASS on unchanged retry after one transient runner startup failure.
- A_NORMAL revision-two before capture: PASS.
- A_NORMAL revision-three after capture: PASS.
- D_COLLAPSE revision-three neighbor capture: PASS.
- Runtime errors: none.
- Browser errors: none.
- Candidate status: all three capture return codes zero.
- Direct screenshot inspection: PASS.
- Bug sweep: PASS at candidate level.
- GitHub software-WebGL after timing: p50 16.4 ms, p95 19.5 ms, p99 20.5 ms; matched before p95 was 17.9 ms. This is regression-screening data, not representative hardware GPU proof.

## Improvement score

Before total: 29 / 40.

After total: 32 / 40.

Improved dimensions: realism, lighting/read of luminous points, and visual richness. No scored dimension regressed.

## Verdict

**CANDIDATE PASS.**

**NUMBERED ACCEPTANCE BLOCKED.** The exact canonical primary Shard God image is still missing at `assets/source-reference/shard-god/1761893423477.jpg.png`, so this work cannot be committed as `visual-03:` and does not count toward the fifty accepted iterations. Accepted count remains **0 / 50**.
