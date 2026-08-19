export class SoundSystem {
  constructor(statusNode) {
    this.statusNode = statusNode;
    this.ctx = null;
    this.master = null;
    this.started = false;
  }

  async unlock() {
    if (this.started) return;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) {
      this.statusNode.textContent = 'AUDIO UNAVAILABLE — visual equivalents active';
      return;
    }
    this.ctx = new Ctx();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.085;
    this.master.connect(this.ctx.destination);

    const hum = this.ctx.createOscillator();
    const humGain = this.ctx.createGain();
    hum.type = 'sine'; hum.frequency.value = 42;
    humGain.gain.value = 0.22;
    hum.connect(humGain).connect(this.master);
    hum.start();

    const machinery = this.ctx.createOscillator();
    const machineryGain = this.ctx.createGain();
    machinery.type = 'triangle'; machinery.frequency.value = 86;
    machineryGain.gain.value = 0.035;
    machinery.connect(machineryGain).connect(this.master);
    machinery.start();

    this.started = true;
    this.statusNode.textContent = 'AUDIO LINKED';
  }

  setPhase(phaseIndex, progress) {
    if (!this.started) return;
    const target = phaseIndex < 3 ? 0.085 : phaseIndex < 6 ? 0.11 : 0.055;
    this.master.gain.setTargetAtTime(target, this.ctx.currentTime, 0.4);
    if (phaseIndex === 3) this.master.gain.setTargetAtTime(0.14 + progress * 0.04, this.ctx.currentTime, 0.25);
  }
  dispose() {
    if (this.ctx && this.ctx.state !== 'closed') this.ctx.close().catch(() => {});
  }

}
