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

const visual05After = `  vec2 j=(hash22(cell+seed*1.73)-.5)*.92;
  vec2 starDelta=f-j;
  float screenAspect=uResolution.x/uResolution.y;
  float d=length(rev>=3.0?vec2(starDelta.x/screenAspect,starDelta.y):starDelta);
  float mag=pow((rnd-threshold)/max(1e-5,1.0-threshold),2.6);
  float radius=mix(.115,.300,mag)*sizeScale;
  float pixelFootprint=max(fwidth(d),1e-4);
  float stableRadius=rev>=5.0?max(radius,pixelFootprint*.92):radius;
  float energyComp=rev>=5.0?clamp(radius/stableRadius,.72,1.0):1.0;
  float haloRadius=rev>=5.0?mix(radius,stableRadius,.55):radius;
  float core=rev>=3.0?exp(-d*d/(stableRadius*stableRadius*.18))*1.08*energyComp:smoothstep(radius,0.0,d);
  float halo=rev>=3.0?exp(-d*d/(haloRadius*haloRadius*1.65))*.16*energyComp:0.0;
`;

const visual04Before = `  if(rev>=4.0){
    float band=exp(-pow(abs(p.y*.8 + .14*sin(p.x*1.7)),1.5)*5.8);
    float dust=fbm(p*2.1+vec2(4.1,9.7));
    c += vec3(.032,.035,.075)*band*(.35+.65*dust);
    c *= .7+.3*noise(p*5.0);
  }
`;

const visual04After = `  if(rev>=4.0){
    float bandAxis=p.y*.88 + .11*sin(p.x*1.25) + .025*sin(p.x*4.8);
    float broadBand=exp(-pow(abs(bandAxis)/.32,2.0));
    float coreBand=exp(-pow(abs(bandAxis)/.115,1.45));
    float coarseDust=fbm(p*1.8+vec2(4.1,9.7));
    float fineDust=fbm(p*5.2+vec2(13.7,2.9));
    float mottling=(.28+.72*coarseDust)*(.58+.42*fineDust);
    float laneAxis=bandAxis + .028*(coarseDust-.5);
    float dustLane=exp(-pow(abs(laneAxis)/.038,1.55));
    c += vec3(.0012,.0015,.0038)*broadBand*(.30+.70*mottling);
    c += vec3(.0045,.0035,.0085)*coreBand*(.22+.78*mottling);
    c *= 1.0-dustLane*(.48+.22*(1.0-fineDust));
  }
`;

const visual03Patched = baseFragmentShader.replace(visual03Before, visual03After);
if (visual03Patched === baseFragmentShader || visual03Patched.indexOf(visual03Before) !== -1) {
  throw new Error('Visual-03 shader patch target mismatch.');
}

const visual05Patched = visual03Patched.replace(visual03After, visual05After);
if (visual05Patched === visual03Patched || visual05Patched.indexOf(visual03After) !== -1) {
  throw new Error('Visual-05 shader patch target mismatch.');
}

const visual04Patched = visual05Patched.replace(visual04Before, visual04After);
if (visual04Patched === visual05Patched || visual04Patched.indexOf(visual04Before) !== -1) {
  throw new Error('Visual-04 shader patch target mismatch.');
}

export { vertexShader };
export const fragmentShader = visual04Patched;
