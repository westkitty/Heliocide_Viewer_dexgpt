# Visual-05 Rejected Attempt 01

## Target

`Starfield stability / antialiasing`

## Evidence

- GitHub Actions run: `32223565101`.
- Artifact: `visual-candidate-05-32223565101`, ID `9354816760`.
- Full source validation, browser startup, normal A_NORMAL before/after, D_COLLAPSE neighbor, the extra yaw=0.02 revision-four/revision-five stability pair, artifact persistence, and proof gate all passed.
- Runtime/browser errors were empty.

## Why the attempt is rejected

The static revision-five frame is visually acceptable, but the controlled subpixel-camera probe does not show a clear stability improvement over revision four.

After phase-correlation alignment of a clean dark-sky crop:

- revision four high-frequency stellar energy drift from yaw 0 to yaw 0.02 was about **-3.03%**;
- revision five attempt-one drift was about **-4.64%**;
- bright-star aligned residual error was also higher in revision five.

A stability/antialiasing iteration must improve subpixel sampling behavior, not merely soften static points. Green CI and a pleasant still frame are insufficient.

## Root cause

Attempt one used a heuristic derivative-aware minimum radius with a simple peak-energy compensation. That broadens undersampled stars but is not the correct integral of the Gaussian over a pixel footprint, so flux can still vary as the point moves fractionally across pixel centers.

## Required repair

Keep iteration number **05**. Preserve visual-02 distribution, visual-03 point-spread identity, and visual-04 deep-sky structure. Replace only revision-five sampling with an energy-conserving pixel-footprint approximation:

- derive the base Gaussian variance from the existing core/halo profiles;
- add pixel-box variance from `fwidth(d)` only for revision five and above;
- broaden the effective variance by convolution, not an arbitrary radius floor;
- normalize peak amplitude by base/effective variance to approximately conserve two-dimensional energy;
- retain deterministic positions and temperature colors;
- do not add visual-06 exposure integration.

## Verdict

**REJECTED — does not count.**
