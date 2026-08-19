# Visual-03 Rejected Attempt 01

## Target

`High-quality stellar sprite shader`

## Evidence

- GitHub Actions run: `32221244874`.
- Artifact: `visual-candidate-03-32221244874`, ID `9354015012`.
- Source validation, tests/build, browser startup, revision-two A_NORMAL before capture, and revision-three A_NORMAL after capture all passed.
- D_COLLAPSE neighbor did not complete: `neighbor_rc=1` after `Runtime.evaluate` timed out on the third capture.

## Harness defect

The failure was not a GLSL compile/runtime defect. `scripts/cdp-capture.mjs` opened a fresh Chromium render target for every capture but did not close successful targets. Under software WebGL, the accumulated tabs made the third target unresponsive enough for the bounded `Runtime.evaluate` call to expire.

The generic capture helper has been repaired on `main` to close each completed CDP target after evidence is written. That repair is preflight tooling and is not part of visual-03.

## Visual defect

Direct inspection of the valid revision-two before and revision-three after PNGs rejects the first sprite treatment even apart from the missing neighbor image:

- many revision-three points read as narrow vertical streaks rather than compact stellar point-spread functions;
- the Gaussian halo tail is too broad/energetic and makes the field substantially busier than visual-02;
- the problem is caused by using circular distance in cell coordinates after the starfield coordinate had already been horizontally aspect-scaled;
- visual-02's tiny smooth points hid this anisotropy, while visual-03's larger Gaussian footprint made it obvious.

## Required repair

Keep iteration number **03**. Preserve the visual-02 population exactly. Change only revision-three point-spread behavior:

- compensate the horizontal pre-scaling when calculating revision-three star distance so the rendered footprint is screen-circular;
- reduce core width/energy and halo width/energy;
- keep positions, population density, color temperature, determinism, and visual-02 behavior unchanged;
- add no galactic haze, twinkle, exposure integration, or other later-domain work.

## Verdict

**REJECTED — does not count.**
