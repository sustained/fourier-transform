<template>
  <div class="home">
    <div class="columns p-md">
      <div class="column is-2 is-primary">
        <add-sine-wave @add="addSineWave" />

        <sine-wave-list :sines="sines" @remove="removeSineWave" />

        <div class="card">
          <header class="card-header">
            <h2 class="card-header-title">Controls</h2>
          </header>

          <div class="card-content">
            <b-field label="Zoom Factor">
              <b-numberinput min="1" max="10"></b-numberinput>
            </b-field>
          </div>
        </div>
      </div>

      <div class="column is-10 is-primary">
        <div ref="canvas-container">
          <sine-renderer
            v-for="sine in sines"
            :key="sine.id"
            :sine="sine"
            :width="canvasContainerWidth"
            ref="sine-renderer"
            @added="added"
            @removed="removed"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "@/library/EventBus";
import { id } from "@/library/Utility";

import SineRenderer from "@/components/SineRenderer";
import AddSineWave from "@/components/AddSineWave";
import SineWaveList from "@/components/SineWaveList";

const idGenerator = id();

export default {
  name: "Home",

  components: { AddSineWave, SineWaveList, SineRenderer },

  data() {
    return {
      animationFrame: null,

      canvasContainerWidth: null,

      renderers: [],

      sines: [
        {
          id: idGenerator.next().value,
          hertz: 27.5,
          note: "A",
          octave: 0,
          scientific: "A0"
        }
      ]
    };
  },

  mounted() {
    // this.animationFrame = this.render();

    this.canvasContainerWidth = parseFloat(
      window.getComputedStyle(this.$refs["canvas-container"]).width
    );
  },

  beforeDestroy() {
    // window.cancelAnimationFrame(this.animationFrame);
  },

  methods: {
    addSineWave(input) {
      const sine = {
        id: idGenerator.next().value,
        ...input
      };

      this.sines.push(sine);

      this.$emit("added", {
        sine: sine
      });
    },

    removeSineWave(id) {
      console.log("removing " + id);

      this.sines.splice(this.sines.findIndex(sine => sine.id === id), 1);
    },

    added({ renderer }) {
      this.renderers.push(renderer);

      if (this.animationFrame === null) {
        this.animationFrame = this.render();
      }
    },

    removed({ renderer }) {
      this.renderers.splice(this.renderers.indexOf(renderer), 1);
    },

    render() {
      for (let renderer of this.renderers) {
        renderer();
      }

      if (this.renderers.length === 0) {
        this.animationFrame = null;
        return;
      }

      return window.requestAnimationFrame(this.render);
    }
  }
};
</script>

<style>
canvas {
  box-sizing: border-box;
  border: 1px solid black;
}
</style>
