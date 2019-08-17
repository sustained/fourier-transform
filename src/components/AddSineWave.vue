<template>
  <b-collapse class="card">
    <header slot="trigger" slot-scope="props" class="card-header">
      <h2 class="card-header-title">Add Sine Wave</h2>

      <a class="card-header-icon">
        <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
      </a>
    </header>

    <div class="card-content">
      <b-field label="Hertz">
        <b-input v-model="inputHertz" disabled></b-input>
      </b-field>

      <b-field label="Note">
        <b-select expanded v-model="inputNote" placeholder="Select a note">
          <option v-for="(note, index) in notes" :value="note" :key="index">{{ note }}</option>
        </b-select>
      </b-field>

      <b-field label="Octave">
        <b-numberinput v-model="inputOctave" min="0" max="8"></b-numberinput>
      </b-field>

      <b-button type="is-success" class="m-t-sm" @click="add">Add Wave</b-button>
    </div>
  </b-collapse>
</template>

<script>
import { NOTE_NAMES, fromString, fromFrequency } from "@/library/Notes";

export default {
  name: "AddSineWave",

  data() {
    return {
      notes: NOTE_NAMES,

      inputHertz: 440,
      inputNote: "A",
      inputOctave: 4
    };
  },

  computed: {
    inputScientific() {
      const { note } = fromFrequency(this.inputHertz);

      return note.scientific();
    }
  },

  watch: {
    inputNote(inputNote) {
      const note = fromString(`${inputNote}${this.inputOctave}`);
      this.inputNote = note.name().toUpperCase();
      this.inputHertz = note.fq();
    },

    inputOctave(inputOctave) {
      const note = fromString(`${this.inputNote}${inputOctave}`);
      this.inputNote = note.name().toUpperCase();
      this.inputHertz = note.fq();
    },

    inputHertz(inputHertz) {
      const { note } = fromFrequency(inputHertz);
      this.inputNote = note.name();
      this.inputOctave = note.octave();
    }
  },

  methods: {
    add() {
      this.$emit("add", {
        note: this.inputNote,
        hertz: this.inputHertz,
        octave: this.inputOctave,
        scientific: this.inputScientific
      });
    }
  }
};
</script>

<style>
</style>
