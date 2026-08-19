import { vertexShader, fragmentShader } from './shaders.js';

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile failed: ${log}`);
  }
  return shader;
}

function createProgram(gl) {
  const program = gl.createProgram();
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, vertexShader));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, fragmentShader));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(`Program link failed: ${gl.getProgramInfoLog(program)}`);
  }
  return program;
}

export class HeliocideRenderer {
  constructor(canvas, revision) {
    this.canvas = canvas;
    this.revision = revision;
    this.gl = canvas.getContext('webgl2', {
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true
    });
    if (!this.gl) throw new Error('WebGL2 is required for Heliocide Observatory.');
    this.program = createProgram(this.gl);
    this.gl.useProgram(this.program);
    this.vao = this.gl.createVertexArray();
    this.gl.bindVertexArray(this.vao);
    this.uniform = Object.fromEntries(
      ['uResolution','uTime','uPhase','uPhaseProgress','uRevision','uYaw','uPitch','uCameraMode']
        .map((name) => [name, this.gl.getUniformLocation(this.program, name)])
    );
    this.resize();
    this.onResize = () => this.resize();
    window.addEventListener('resize', this.onResize, { passive: true });
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const width = Math.max(1, Math.floor(this.canvas.clientWidth * dpr));
    const height = Math.max(1, Math.floor(this.canvas.clientHeight * dpr));
    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width;
      this.canvas.height = height;
    }
    this.gl.viewport(0, 0, width, height);
  }

  render(state) {
    const gl = this.gl;
    this.resize();
    gl.useProgram(this.program);
    gl.uniform2f(this.uniform.uResolution, this.canvas.width, this.canvas.height);
    gl.uniform1f(this.uniform.uTime, state.time);
    gl.uniform1f(this.uniform.uPhase, state.phaseIndex);
    gl.uniform1f(this.uniform.uPhaseProgress, state.phaseProgress);
    gl.uniform1f(this.uniform.uRevision, this.revision);
    gl.uniform1f(this.uniform.uYaw, state.yaw);
    gl.uniform1f(this.uniform.uPitch, state.pitch);
    gl.uniform1f(this.uniform.uCameraMode, state.cameraMode);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  info() {
    const gl = this.gl;
    return {
      renderer: gl.getParameter(gl.RENDERER),
      vendor: gl.getParameter(gl.VENDOR),
      version: gl.getParameter(gl.VERSION),
      shadingLanguage: gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
      width: this.canvas.width,
      height: this.canvas.height
    };
  }

  dispose() {
    window.removeEventListener('resize', this.onResize);
    const gl = this.gl;
    if (this.vao) gl.deleteVertexArray(this.vao);
    if (this.program) gl.deleteProgram(this.program);
  }
}
