"use client";

/**
 * Hafif, tamamen prosedürel (Web Audio API ile üretilen) efekt sesleri.
 * Dışarıdan ses dosyası yüklenmez — telif/lisans derdi yok, sıfır ağ isteği.
 */

let ctx: AudioContext | null = null;
let muted = false;
let ambientNodes: { stop: () => void } | null = null;

const STORAGE_KEY = "supheli:sesli";

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

export function isSoundEnabled(): boolean {
  if (typeof window === "undefined") return true;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === null ? true : stored === "1";
}

export function setSoundEnabled(enabled: boolean) {
  muted = !enabled;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, enabled ? "1" : "0");
  }
  if (!enabled) stopAmbient();
}

function noiseBuffer(c: AudioContext, seconds: number) {
  const buffer = c.createBuffer(1, c.sampleRate * seconds, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return buffer;
}

/** kağıt hışırtısı: filtrelenmiş, hızla sönen gürültü */
export function playPaper() {
  if (muted || !isSoundEnabled()) return;
  const c = getCtx();
  if (!c) return;
  const src = c.createBufferSource();
  src.buffer = noiseBuffer(c, 0.25);
  const filter = c.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = 1800;
  const gain = c.createGain();
  gain.gain.setValueAtTime(0.06, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.22);
  src.connect(filter).connect(gain).connect(c.destination);
  src.start();
  src.stop(c.currentTime + 0.25);
}

/** ince tık sesi: sekme/pin etkileşimi */
export function playTick() {
  if (muted || !isSoundEnabled()) return;
  const c = getCtx();
  if (!c) return;
  const osc = c.createOscillator();
  osc.type = "square";
  osc.frequency.setValueAtTime(1200, c.currentTime);
  const gain = c.createGain();
  gain.gain.setValueAtTime(0.03, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.05);
  osc.connect(gain).connect(c.destination);
  osc.start();
  osc.stop(c.currentTime + 0.05);
}

/** kauçuk damga: alçak "gümm" + kısa gürültü darbesi */
export function playStamp() {
  if (muted || !isSoundEnabled()) return;
  const c = getCtx();
  if (!c) return;

  const osc = c.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(120, c.currentTime);
  osc.frequency.exponentialRampToValueAtTime(45, c.currentTime + 0.18);
  const oscGain = c.createGain();
  oscGain.gain.setValueAtTime(0.35, c.currentTime);
  oscGain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.32);
  osc.connect(oscGain).connect(c.destination);
  osc.start();
  osc.stop(c.currentTime + 0.32);

  const src = c.createBufferSource();
  src.buffer = noiseBuffer(c, 0.08);
  const filter = c.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 900;
  const noiseGain = c.createGain();
  noiseGain.gain.setValueAtTime(0.25, c.currentTime);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.08);
  src.connect(filter).connect(noiseGain).connect(c.destination);
  src.start();
  src.stop(c.currentTime + 0.08);
}

/** arkaplan ambiyansı: kahverengi gürültü (tren uğultusu) + hafif yağmur katmanı, döngülü */
export function startAmbient() {
  if (muted || !isSoundEnabled() || ambientNodes) return;
  const c = getCtx();
  if (!c) return;

  const master = c.createGain();
  master.gain.value = 0;
  master.connect(c.destination);
  master.gain.linearRampToValueAtTime(0.05, c.currentTime + 2);

  // brown noise (tren/motor uğultusu)
  const bufferSize = 4 * c.sampleRate;
  const brownBuffer = c.createBuffer(1, bufferSize, c.sampleRate);
  const data = brownBuffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[i] = last * 3.5;
  }
  const brownSrc = c.createBufferSource();
  brownSrc.buffer = brownBuffer;
  brownSrc.loop = true;
  const lowpass = c.createBiquadFilter();
  lowpass.type = "lowpass";
  lowpass.frequency.value = 220;
  brownSrc.connect(lowpass).connect(master);
  brownSrc.start();

  // hafif yüksek frekans "yağmur/tel cızırtısı" katmanı
  const hissSrc = c.createBufferSource();
  hissSrc.buffer = noiseBuffer(c, 4);
  hissSrc.loop = true;
  const hipass = c.createBiquadFilter();
  hipass.type = "highpass";
  hipass.frequency.value = 4000;
  const hissGain = c.createGain();
  hissGain.gain.value = 0.15;
  hissSrc.connect(hipass).connect(hissGain).connect(master);
  hissSrc.start();

  ambientNodes = {
    stop: () => {
      master.gain.cancelScheduledValues(c.currentTime);
      master.gain.linearRampToValueAtTime(0, c.currentTime + 0.6);
      setTimeout(() => {
        brownSrc.stop();
        hissSrc.stop();
      }, 700);
    },
  };
}

export function stopAmbient() {
  ambientNodes?.stop();
  ambientNodes = null;
}
