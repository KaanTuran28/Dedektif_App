"use client";

/**
 * Hafif, tamamen prosedürel (Web Audio API ile üretilen) efekt sesleri.
 * Dışarıdan ses dosyası YOK — telif riski sıfır, ağ isteği yok.
 * Bilinçli olarak sadece ETKİLEŞİM anlarında çalar — sürekli/ambiyans
 * müzik/ses YOK (kullanıcı geri bildirimiyle kaldırıldı, rahatsız ediyordu).
 */

let ctx: AudioContext | null = null;
let muted = false;

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

/** yükselen iki nota: doğru eşleştirme onayı */
export function playMatch() {
  if (muted || !isSoundEnabled()) return;
  const c = getCtx();
  if (!c) return;
  [523, 784].forEach((freq, i) => {
    const osc = c.createOscillator();
    osc.type = "sine";
    const start = c.currentTime + i * 0.09;
    osc.frequency.setValueAtTime(freq, start);
    const gain = c.createGain();
    gain.gain.setValueAtTime(0.001, start);
    gain.gain.exponentialRampToValueAtTime(0.12, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.2);
    osc.connect(gain).connect(c.destination);
    osc.start(start);
    osc.stop(start + 0.22);
  });
}

/** alçalan kısa nota: yanlış eşleştirme */
export function playMismatch() {
  if (muted || !isSoundEnabled()) return;
  const c = getCtx();
  if (!c) return;
  const osc = c.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(220, c.currentTime);
  osc.frequency.exponentialRampToValueAtTime(140, c.currentTime + 0.15);
  const gain = c.createGain();
  gain.gain.setValueAtTime(0.1, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.18);
  osc.connect(gain).connect(c.destination);
  osc.start();
  osc.stop(c.currentTime + 0.18);
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
