export const vertexShader = `#version 300 es
precision highp float;
out vec2 vUv;
void main(){
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  vUv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

export const fragmentShader = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform vec2 uResolution;
uniform float uTime;
uniform float uPhase;
uniform float uPhaseProgress;
uniform float uRevision;
uniform float uYaw;
uniform float uPitch;
uniform float uCameraMode;

#define PI 3.141592653589793

float hash21(vec2 p){
  p = fract(p * vec2(123.34,456.21));
  p += dot(p,p + 45.32);
  return fract(p.x*p.y);
}
vec2 hash22(vec2 p){
  float n = hash21(p);
  return vec2(n, hash21(p+n+17.17));
}
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
  return mix(mix(hash21(i),hash21(i+vec2(1,0)),f.x),mix(hash21(i+vec2(0,1)),hash21(i+vec2(1)),f.x),f.y);
}
float fbm(vec2 p){
  float v=0.0,a=.5; mat2 m=mat2(1.6,1.2,-1.2,1.6);
  for(int i=0;i<5;i++){v+=a*noise(p);p=m*p+7.3;a*=.5;}
  return v;
}
vec3 kelvin(float k){
  vec3 cool=vec3(.55,.72,1.0), warm=vec3(1.0,.71,.43), white=vec3(1.0,.96,.9);
  return k<.5?mix(warm,white,k*2.0):mix(white,cool,(k-.5)*2.0);
}
float sdCircle(vec2 p,float r){return length(p)-r;}
float aa(float d,float w){return 1.0-smoothstep(-w,w,d);}

vec3 starPopulationLayer(vec2 p,float scale,vec2 seed,float baseThreshold,float densitySpread,float exposure,float rev,float sizeScale,float energyScale){
  vec2 grid=p*scale;
  vec2 cell=floor(grid);
  vec2 f=fract(grid)-.5;
  float density=smoothstep(.24,.88,noise((cell+seed*37.0)*.020));
  float threshold=clamp(baseThreshold-density*densitySpread,.970,.9998);
  float rnd=hash21(cell+seed);
  if(rnd<=threshold) return vec3(0.0);
  vec2 j=(hash22(cell+seed*1.73)-.5)*.92;
  float d=length(f-j);
  float mag=pow((rnd-threshold)/max(1e-5,1.0-threshold),2.6);
  float radius=mix(.115,.300,mag)*sizeScale;
  float core=rev>=3.0?exp(-d*d/(radius*radius*.25))*1.4:smoothstep(radius,0.0,d);
  float halo=rev>=3.0?exp(-d*d/(radius*radius*2.6))*.34:0.0;
  float temp=hash21(cell+seed+81.7);
  vec3 sc=kelvin(temp);
  return sc*(core+halo)*mix(.16,1.35,mag)*exposure*energyScale;
}

vec3 starField(vec2 uv,float exposure,float wall){
  vec3 c=vec3(0.0);
  float rev=uRevision;
  vec2 p=uv*vec2(uResolution.x/uResolution.y,1.0);
  p += vec2(uYaw*.035,uPitch*.025);
  if(rev>=4.0){
    float band=exp(-pow(abs(p.y*.8 + .14*sin(p.x*1.7)),1.5)*5.8);
    float dust=fbm(p*2.1+vec2(4.1,9.7));
    c += vec3(.032,.035,.075)*band*(.35+.65*dust);
    c *= .7+.3*noise(p*5.0);
  }
  if(rev<2.0){
    vec2 grid=p*220.0;
    vec2 cell=floor(grid);
    vec2 f=fract(grid)-.5;
    float rnd=hash21(cell);
    vec2 j=(hash22(cell)-.5)*.78;
    float d=length(f-j);
    if(rnd>.985){
      float radius=.034;
      float core=smoothstep(radius,0.0,d);
      c += vec3(.8,.9,1.0)*core*.6*exposure;
    }
  }else{
    c += starPopulationLayer(p,150.0,vec2(19.1,73.7),.9988,.0120,exposure,rev,1.0,1.0);
    c += starPopulationLayer(p,280.0,vec2(113.4,31.9),.99965,.0035,exposure,rev,.82,.42);
  }
  if(rev>=5.0){ c = min(c,vec3(2.4)); }
  return c*wall;
}

float siegeMask(vec2 uv){
  if(uPhase < 5.0) return 1.0;
  float rev=uRevision;
  float advance=clamp((uTime-108.0)/28.0,0.0,1.0);
  if(rev<7.0){
    // Baseline is already canonical sky-space extinction, but the edge is too smooth.
    // Visual-07/08 refine this into a more natural, irregular propagation front.
    float edge=.88-advance*1.42 + .035*sin(uv.y*2.0);
    return smoothstep(-.11,.06,-(uv.x-edge));
  }
  float warp=rev>=8.0?(fbm(uv*3.4+vec2(2.1,-1.7))-.5)*.34:0.0;
  float edge=.95-advance*1.55 + warp;
  float d=uv.x-edge + .10*sin(uv.y*2.3);
  return smoothstep(-.08,.055,-d);
}

vec3 renderSun(vec2 uv, vec3 bg){
  float rev=uRevision;
  float collapse=clamp((uTime-58.0)/27.0,0.0,1.0);
  vec2 center=vec2(.30,.10);
  if(uCameraMode>1.5) center=vec2(.08,.02);
  vec2 q=uv-center;
  float r=length(q);
  float baseR=.245;
  float stellarR=baseR*(1.0-.72*smoothstep(.0,.58,collapse));
  float black=step(.63,collapse);
  float ang=atan(q.y,q.x);
  float gran=rev>=9.0?(fbm(vec2(ang*5.0,r*46.0-uTime*.08))-.5)*.018:0.0;
  float disk=aa(r-stellarR-gran,.0035);
  vec3 starColor=mix(vec3(1.25,.57,.18),vec3(1.3,1.15,.98),clamp(collapse*.9,0.0,1.0));
  if(rev>=12.0) starColor=mix(starColor,vec3(.75,.9,1.35),smoothstep(.25,.7,collapse));
  float limb=pow(clamp(1.0-r/max(stellarR,.001),0.0,1.0),.22);
  vec3 photosphere=starColor*(.65+1.35*limb);
  if(rev>=9.0) photosphere*=.82+.35*fbm(q*80.0+uTime*.025);
  vec3 c=mix(bg,photosphere,disk*(1.0-black));
  if(rev>=10.0 && black<.5){
    float corona=exp(-max(r-stellarR,0.0)*15.0)*(1.0-disk)*.42;
    float ray=pow(max(0.0,cos(ang*7.0+fbm(vec2(ang*3.0,uTime*.01))*2.0)),14.0);
    c+=starColor*corona*(.5+.8*ray);
  }
  if(rev>=13.0 && collapse>.22 && collapse<.8){
    float shock=exp(-pow((r-stellarR*(1.7+collapse*2.0))/.018,2.0));
    float broken=.35+.65*noise(vec2(ang*12.0,uTime*.03));
    c+=vec3(1.2,.62,.24)*shock*broken*(1.0-collapse)*1.8;
  }
  if(black>.5){
    // Protected baseline: the collapse always resolves into a dark compact object.
    // Revision fourteen sharpens this crude seed into the true event-horizon treatment.
    float horizon=rev>=14.0?.078:.071;
    float h=1.0-aa(r-horizon,rev>=14.0?.0025:.006);
    c*=h;
    if(rev<15.0){
      float crudeBand=exp(-abs(length(vec2(q.x,q.y*3.4))-.138)*58.0)*smoothstep(.072,.098,r);
      c+=vec3(.78,.24,.055)*crudeBand*.62;
    }
    if(rev>=15.0){
      float ellipse=abs(length(vec2(q.x,q.y*4.8))-.145);
      float diskBand=exp(-ellipse*95.0)*smoothstep(.072,.095,r);
      float temp=clamp((.24-r)/.18,0.0,1.0);
      vec3 ac=mix(vec3(.9,.20,.06),vec3(1.3,.92,.48),temp);
      if(rev>=16.0) ac*=.48+1.18*smoothstep(-.8,.8,cos(ang));
      c+=ac*diskBand*1.25;
    }
    if(rev>=17.0){
      float ring=exp(-abs(r-.084)*240.0);
      c+=vec3(1.3,1.08,.72)*ring*.85;
    }
  }
  return c;
}

vec3 renderPlanet(vec2 uv, vec3 bg){
  float rev=uRevision;
  float collapse=clamp((uTime-58.0)/50.0,0.0,1.0);
  vec2 center=vec2(-.44,-.17);
  if(rev>=27.0) center += vec2(-.06*collapse*collapse,.025*collapse);
  vec2 q=(uv-center)/.205;
  float rr=dot(q,q);
  if(rr>1.10) return bg;
  float z=sqrt(max(0.0,1.0-rr));
  vec3 n=normalize(vec3(q,z));
  vec3 lightDir=normalize(vec3(.82,.34,.34));
  float ndl=max(dot(n,lightDir),0.0);
  vec2 sph=vec2(atan(n.z,n.x)/PI,asin(n.y)/PI);
  float land=fbm(sph*vec2(4.5,8.0)+vec2(3.1,7.4));
  if(rev>=21.0) land += .34*fbm(sph*vec2(14.0,22.0)+19.0);
  float landMask=smoothstep(.47,.55,land);
  vec3 ocean=vec3(.018,.055,.115);
  vec3 soil=vec3(.13,.16,.12);
  vec3 high=vec3(.28,.27,.22);
  vec3 surface=mix(ocean,mix(soil,high,smoothstep(.58,.82,land)),landMask);
  if(rev>=22.0){
    float spec=pow(max(dot(reflect(-lightDir,n),vec3(0,0,1)),0.0),55.0)*(1.0-landMask);
    surface += spec*vec3(.55,.66,.72);
    surface *= .72+.45*ndl;
  } else surface*=.25+.75*ndl;
  if(rev>=24.0){
    float cloud=fbm(sph*vec2(11.0,17.0)+vec2(uTime*.002,0.0));
    float cloudMask=smoothstep(.61,.72,cloud);
    surface=mix(surface,vec3(.58,.63,.68)*(0.32+.68*ndl),cloudMask*.64);
  }
  if(rev>=25.0){
    float citySeed=hash21(floor((sph+1.0)*vec2(220.0,140.0)));
    float coast=landMask*smoothstep(.44,.60,land)*(1.0-smoothstep(.69,.80,land));
    float night=1.0-smoothstep(.03,.24,ndl);
    float cities=smoothstep(.972,.998,citySeed)*coast*night;
    if(rev>=29.0) cities*=1.0-smoothstep(.18,.92,collapse*(.65+.5*noise(sph*18.0)));
    surface+=vec3(1.1,.62,.22)*cities*2.2;
  }
  if(rev>=26.0){
    surface*=.32+.68*smoothstep(-.02,.10,dot(n,lightDir));
  }
  float edge=smoothstep(1.0,.96,rr);
  vec3 c=mix(bg,surface,edge);
  if(rev>=23.0){
    float rim=pow(1.0-z,4.5)*edge;
    c+=vec3(.11,.35,.58)*rim*(.35+.65*ndl);
  }
  if(rev>=28.0 && collapse>.45){
    float strip=exp(-abs(q.y-.15*sin(q.x*5.0))*.45)*smoothstep(.35,1.0,collapse)*smoothstep(.4,1.05,rr);
    c+=vec3(.15,.38,.52)*strip*.16;
  }
  return c;
}

vec3 infrastructure(vec2 uv, vec3 c){
  float rev=uRevision;
  float collapse=clamp((uTime-58.0)/55.0,0.0,1.0);
  for(int i=0;i<7;i++){
    if(rev<30.0 && i>=4) continue;
    float fi=float(i);
    float a=fi*.82+uTime*.006*(1.0+fi*.1);
    vec2 p=vec2(-.44,-.17)+vec2(cos(a),sin(a)*.55)*(.27+.02*fi);
    if(rev>=27.0) p+=vec2(-.06*collapse*collapse,.025*collapse);
    vec2 d=uv-p;
    float body=aa(length(d)-(rev>=30.0?.008:.005),.002);
    vec3 manufactured=rev>=30.0?vec3(.32,.36,.38)+vec3(.25,.45,.65)*max(0.0,sin(fi*3.1)):vec3(.28,.31,.34);
    c=mix(c,manufactured,body);
  }
  return c;
}

vec3 spacecraft(vec2 uv, vec3 c){
  float rev=uRevision;
  float collapse=clamp((uTime-58.0)/62.0,0.0,1.0);
  vec2 p=vec2(.55,-.27)+vec2(-.14*collapse,.05*sin(uTime*.03));
  vec2 q=uv-p;
  q.x*=1.3;
  float hull=aa(max(abs(q.y)-(rev>=31.0?.012:.009),abs(q.x)-(rev>=31.0?.045:.032)),.003);
  float nose=aa(length(q-vec2(rev>=31.0?.045:.032,0.0))-(rev>=31.0?.015:.010),.003);
  float wing=rev>=31.0?aa(abs(q.y)-(.009+.18*max(0.0,-q.x)),.004)*step(abs(q.x),.035):0.0;
  float m=max(hull,max(nose,wing*.35));
  c=mix(c,rev>=31.0?vec3(.34,.37,.42)*(.8+.2*sin(q.x*90.0)):vec3(.31,.33,.36),m);
  if(rev>=32.0){
    float plume=exp(-abs(q.y)*70.0)*smoothstep(-.15,-.04,q.x)*smoothstep(-.25,-.05,q.x);
    c+=vec3(.22,.48,.78)*plume*.55*(.6+.4*sin(uTime*.1));
  }
  return c;
}

vec3 stationExterior(vec2 uv, vec3 c){
  if(uPhase<6.0) return c;
  float loss=clamp((uTime-125.0)/13.0,0.0,1.0);
  vec2 p=uv-vec2(.1,-.02);
  float ang=loss*.2;
  mat2 rot=mat2(cos(ang),-sin(ang),sin(ang),cos(ang)); p=rot*p;
  float ring=abs(length(vec2(p.x,p.y*1.6))-.20)-.010;
  float spine=max(abs(p.x)-.29,abs(p.y)-.014);
  float hub=length(p)-.065;
  float obs=max(abs(p.x+.12)-(uRevision>=33.0?.10:.075),abs(p.y-.055)-.018);
  float shell=min(min(ring,spine),min(hub,obs));
  float m=aa(shell,.0035);
  vec3 mat=vec3(.12,.14,.17)+vec3(.13,.14,.16)*(.5+.5*sin((p.x+p.y)*110.0));
  c=mix(c,mat,m);
  if(uRevision>=38.0){
    float practical=exp(-pow(abs(p.x+.12)/.18,10.0))*exp(-pow(abs(p.y-.055)/.026,6.0));
    c+=vec3(.35,.42,.5)*practical*.25;
  }
  return c;
}

vec3 vfx(vec2 uv, vec3 c){
  float rev=uRevision;
  if(uPhase<4.0) return c;
  float t=uTime;
  float breach=clamp((t-85.0)/23.0,0.0,1.0);
  {
    vec2 source=vec2(.72,.30);
    for(int i=0;i<22;i++){
      if(rev<40.0 && i>=6) continue;
      float fi=float(i);
      float seed=hash21(vec2(fi,12.3));
      float life=fract(t*(.10+.03*seed)+seed);
      vec2 dir=normalize(vec2(.9+.3*seed,.28*(seed-.5)));
      vec2 p=source + dir*life*(.35+.22*seed);
      float d=length((uv-p)*vec2(1.0,2.0));
      float spark=exp(-d*d*(rev>=40.0?38000.0:26000.0))*(1.0-life)*breach;
      c+=mix(vec3(.6,.72,.78),vec3(1.0,.48,.18),step(.72,seed))*spark*(rev>=40.0?1.0:.42);
    }
  }
  {
    for(int i=0;i<12;i++){
      if(rev<41.0 && i>=4) continue;
      float fi=float(i);
      float seed=hash21(vec2(fi,77.7));
      vec2 p=vec2(.62,.18)+vec2(.42,.28)*vec2(fract(seed+t*.007*(.4+seed)),fract(seed*4.7+t*.003)-.5);
      float d=max(abs(uv.x-p.x)-.006*(.5+seed),abs(uv.y-p.y)-.003);
      c=mix(c,vec3(.22,.25,.28),aa(d,.002)*breach*(rev>=41.0?1.0:.55));
    }
  }
  return c;
}

void main(){
  vec2 frag=gl_FragCoord.xy/uResolution.xy;
  vec2 uv=(frag-.5)*vec2(uResolution.x/uResolution.y,1.0);
  if(uRevision>=34.0){ uv += vec2(sin(uTime*.15)*.0012,cos(uTime*.11)*.0008)*(uPhase>=4.0?1.0:0.18); }
  float wall=siegeMask(uv);
  float collapse=clamp((uTime-58.0)/32.0,0.0,1.0);
  float exposure=1.0;
  if(uRevision>=6.0) exposure=mix(.44,1.18,smoothstep(.34,.82,collapse));
  if(uRevision>=20.0 && uPhase>=4.0) exposure*=.56;
  vec2 starUv=uv;
  if(uRevision>=18.0 && collapse>.62){
    vec2 bh=uv-vec2(.30,.10);
    float r=length(bh);
    starUv += normalize(bh+1e-5)*(.012/(r+.035))*smoothstep(.42,.08,r);
  }
  vec3 c=starField(starUv,exposure,wall);
  c=renderSun(uv,c);
  c=renderPlanet(uv,c);
  c=infrastructure(uv,c);
  c=spacecraft(uv,c);
  c=stationExterior(uv,c);
  c=vfx(uv,c);
  if(uRevision>=49.0){
    float vign=1.0-smoothstep(.46,.82,length(frag-.5));
    c*=.78+.22*vign;
    float grain=(hash21(gl_FragCoord.xy+floor(uTime*12.0))-.5)*.018;
    c+=grain;
  }
  if(uRevision>=1.0){
    // ACES-inspired filmic curve + output gamma.
    c=max(vec3(0.0),c);
    c=(c*(2.51*c+.03))/(c*(2.43*c+.59)+.14);
    c=pow(clamp(c,0.0,1.0),vec3(1.0/2.2));
  }
  outColor=vec4(c,1.0);
}`;
