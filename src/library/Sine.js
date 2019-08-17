import Vector2 from "./Vector2";

export function * generateSineWave(hertz) {
  for (let x = 0; x < Number.MAX_SAFE_INTEGER; x ++) {
    const y = Math.sin((x * hertz * Math.PI) / 180);
    yield new Vector2(x, y);
  }
}
