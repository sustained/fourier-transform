import teoria from "teoria";

const NOTE_NAMES = ["A", "A#", "B", "C", "Db", "D", "Eb", "E", "F", "F#", "G", "G#"];
const OCTAVES = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const FREQUENCIES = [];
const NOTES = [];

for (let i = 1; i <= 88; i ++) {
  const note = teoria.note.fromKey(i);

  NOTES.push(note.scientific());
  FREQUENCIES.push(note.fq());
}

const { fromString, fromFrequency } = teoria.note;

export { NOTES, OCTAVES, NOTE_NAMES, FREQUENCIES, fromString, fromFrequency };
