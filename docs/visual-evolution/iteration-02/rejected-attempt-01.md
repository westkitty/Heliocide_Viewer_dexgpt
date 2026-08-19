# Visual-02 Rejected Attempt 01

## Target

`Deterministic astronomical star distribution`

## Evidence

- Clean technical run: GitHub Actions `32220198833`.
- Artifact: `visual-candidate-02-32220198833`, ID `9353700471`.
- `npm ci`, typecheck/contracts, tests, build, deterministic Chromium/WebGL startup, three captures, artifact upload, persistence, and final proof gate all passed.
- Comparison: revision one -> revision two at `A_NORMAL`; revision-two `D_COLLAPSE` neighbor also captured.

## Visual inspection

The candidate is **REJECTED** despite green technical validation. At 1600x900, revision two is visually indistinguishable from revision one. Supplemental image-delta analysis found only about two dozen materially changed background pixels; bright-star counts did not increase and in several thresholds decreased slightly.

The existing revision-two logic changed probability/temperature math but left stars effectively sub-pixel and did not produce an observable astronomical distribution improvement.

## Required repair

Keep iteration number **02**. Stay in the same domain and replace the weak single-grid threshold change with an observable deterministic multi-scale star population:

- no time-dependent twinkle;
- no galactic band/haze (visual-04 owns that);
- no Gaussian stellar halo / photon-like point-spread polish (visual-03 owns that);
- deterministic irregular cell jitter;
- broad deterministic density variation rather than a uniform wallpaper field;
- at least two population scales so the visible field has sparse bright anchors plus a finer subordinate population;
- preserve visual-01 color management and all protected gameplay/canon behavior.

## Verdict

**REJECTED — does not count.**
