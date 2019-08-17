const A4 = 440; // Hz
const POSITION_OF_A4 = 49;
const TWELFTH_ROOT_OF_TWO = Math.pow(2, 1 / 12);

export const NOTES_PER_OCTAVE = 12;
export const NOTES_ON_GRAND_PIANO = 88;

export function keyToFrequency(key) {
  return Math.pow(TWELFTH_ROOT_OF_TWO, key - POSITION_OF_A4) * A4;
}

export function frequencyToKey(freq) {
  return Math.floor(NOTES_PER_OCTAVE * Math.log2(freq / A4) + POSITION_OF_A4);
}

const FREQUENCIES = [];
const NOTES = [];

for (let i = 1; i < NOTES_ON_GRAND_PIANO; i ++) {
  const frequency = keyToFrequency(i);

  NOTES.push(frequencyToNoteName(frequency));
  FREQUENCIES.push(frequency);
}

export { NOTES, FREQUENCIES };

export const OCTAVES = [0, 1, 2, 3, 4, 5, 6, 7, 8];
export const NOTE_NAMES = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

export function frequencyInRange(frequency) {
  return frequency >= FREQUENCIES[0] && frequency <= FREQUENCIES[NOTES_ON_GRAND_PIANO - 1];
}

export function frequencyToNoteName(frequency) {
  const key = frequencyToKey(frequency);
  const octave = Math.floor(key / NOTES_PER_OCTAVE);
  const noteIndex = key % NOTES_PER_OCTAVE;

  return NOTE_NAMES[noteIndex] + octave;
}
