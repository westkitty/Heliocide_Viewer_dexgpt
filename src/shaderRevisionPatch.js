import { vertexShader, fragmentShader as baseFragmentShader } from './shaders.js';

const visual03Before = `  vec2 j=(hash22(cell+seed*1.73)-.5)*.92;
  float d=length(f-j);
  float mag=pow((rnd-threshold)/max(1e-5,1.0-threshold),2.6);
  float radius=mix(.115,.300,mag)*sizeScale;
  float core=rev>=3.0?exp(-d*d/(radius*radius*.25))*1.4:smoothstep(radius,0.0,d);
  float halo=rev>=3.0?exp(-d*d/(radius*radius*2.6))*.34:0.0;
`;

const visual03After = `  vec2 j=(hash22(cell+seed*1.73)-.5)*.92;
  vec2 starDelta=f-j;
  float screenAspect=uResolution.x/uResolution.y;
  float d=length(rev>=3.0?vec2(starDelta.x/screenAspect,starDelta.y):starDelta);
  float mag=pow((rnd-threshold)/max(1e-5,1.0-threshold),2.6);
  float radius=mix(.115,.300,mag)*sizeScale;
  float core=rev>=3.0?exp(-d*d/(radius*radius*.18))*1.08:smoothstep(radius,0.0,d);
  float halo=rev>=3.0?exp(-d*d/(radius*radius*1.65))*.16:0.0;
`;

const patchedFragmentShader = baseFragmentShader.replace(visual03Before, visual03After);
if (patchedFragmentShader === baseFragmentShader) {
  throw new Error('Visual-03 shader patch target was not found exactly once.');
}
if (patchedFragmentShader.indexOf(visual03Before) !== -1) {
  throw new Error('Visual-03 shader patch left the legacy point-spread block behind.');
}

export { vertexShader };
export const fragmentShader = patchedFragmentShader;
