# Visual-02 Candidate Report

## Target

`Deterministic astronomical star distribution`

Branch: `dexgpt-visual-02-candidate`

Implementation head evaluated by the authoritative clean run: `24b977e222b4ba2b8b6b154e71a951786c015982`

Authoritative GitHub Actions run: `32220732828`

Artifact: `visual-candidate-02-32220732828` / `9353868353`

Checkpoint: `A_NORMAL`

Neighbor: `D_COLLAPSE`

Asset fallback: primary Shard God reference substituted with the exact secondary reference **only inside the ephemeral runner workspace**. This makes the evidence candidate-only and prevents numbered acceptance.

## Attempt history

Attempt 01 was rejected even though CI was green because the observable visual change was negligible. The same iteration number was retained.

Attempt 02 replaced the weak single-grid threshold adjustment with two deterministic population scales, irregular cell jitter, and broad deterministic density variation. It intentionally does not add temporal twinkle, galactic haze, or revision-three Gaussian/halo treatment.

## Observable before / after

Before, the revision-one view contained only a very sparse scattering of tiny points across the viewport. After, the sky has a clearly richer but still restrained population: brighter sparse anchors plus a finer subordinate layer, distributed irregularly across the field. The improvement is obvious at normal 1600x900 viewing size and does not require pixel differencing to perceive.

The primary star, inhabited planet, station architecture, three crew figures, HUD, and camera framing remain matched. The D_COLLAPSE neighbor remains coherent with the denser field.

## Physical / artistic improvement

- More credible astronomical depth and scale from a layered stellar population rather than a near-empty or uniform field.
- Deterministic density structure without atmospheric twinkle.
- No visible grid, lattice, repeating row structure, or generic neon treatment.
- No galactic band or deep-sky haze is introduced early; visual-04 remains a separate domain.
- Star point-spread/halo quality is intentionally deferred to visual-03.

## Validation

- `npm ci`: PASS.
- Typecheck/contracts: PASS with documented candidate-only asset fallback.
- Tests: PASS.
- Build: PASS.
- Deterministic Chromium/WebGL startup: PASS.
- A_NORMAL revision-one before capture: PASS.
- A_NORMAL revision-two after capture: PASS.
- D_COLLAPSE revision-two neighbor capture: PASS.
- Runtime errors: none.
- Browser errors: none.
- Candidate status: all three capture return codes zero.
- Direct screenshot inspection: PASS.
- Bug sweep: PASS at candidate level.
- Performance: no observed regression on GitHub software WebGL; after p95 17.2 ms, neighbor p95 17.1 ms.

## Improvement score

Before total: 26 / 40.

After total: 29 / 40.

Improved dimensions: realism, scale, and visual richness. No scored dimension regressed.

## Verdict

**CANDIDATE PASS.**

**NUMBERED ACCEPTANCE BLOCKED.** The exact canonical primary Shard God image is still missing at `assets/source-reference/shard-god/1761893423477.jpg.png`, so this work cannot be committed as `visual-02:` and does not count toward the fifty accepted iterations. Accepted count remains **0 / 50**.
