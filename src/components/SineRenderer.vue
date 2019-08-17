<template>
  <div>
    <canvas ref="canvas" :width="width" :height="height"></canvas>
  </div>
</template>

<script>
import bus from "@/library/EventBus";
// import Vector2 from "@/library/Vector2";

import { generateSineWave } from "@/library/Sine";

export default {
  name: "SineRenderer",

  props: {
    width: {
      type: Number,
      default: 800
    },

    height: {
      type: Number,
      default: 200
    },

    /*
      Iterations aka hertz (cycles per second).
    */
    iterations: {
      type: [Number, String], // Allow strings too basically because of range inputs.
      default: 1.0,
      validator(value) {
        return parseInt(value) >= 1.0;
      }
    },

    seconds: {
      type: Number,
      default: 1.0
    }
  },

  data() {
    return {
      context: null
    };
  },

  computed: {
    halfHeight() {
      return this.height / 2;
    },

    waveHeight() {
      return Math.max(
        50,
        Math.min(this.height - 50, this.height - (this.iterations / 2) * 20)
      );
    },

    scaleFactorX() {
      return this.width / 360;
    }
  },

  mounted() {
    this.context = this.$refs.canvas.getContext("2d");

    bus.$on("render", this.render);
  },

  beforeDestroy() {
    bus.$off("render", this.render);
  },

  methods: {
    render() {
      const { context } = this;

      context.clearRect(0, 0, this.width, this.height);

      this.drawGraph(context);
      this.drawSineWave(context);
    },

    drawGraph(context) {
      const numSections = this.seconds * 10;
      const sectionWidth = this.width / numSections;

      for (let x = 0; x < numSections; x ++) {
        context.beginPath();
        context.moveTo(x * sectionWidth, this.height - 20);
        context.lineTo(x * sectionWidth, this.height);
        context.stroke();
        context.lineWidth = x % 2 === 1 ? 3.0 : 1.0;
        context.closePath();
      }
    },

    drawSineWave(context) {
      const generator = generateSineWave(this.iterations);

      context.beginPath();
      for (let x = 0; x <= 360; x += 1) {
        const sine = generator.next().value;

        const y = this.halfHeight - sine.j * (this.waveHeight / 2);
        context.lineTo(sine.i * this.scaleFactorX, y);
      }
      context.lineWidth = 1.0;
      context.stroke();
      context.closePath();

      window.requestAnimationFrame(this.render);
    }
  }
};
</script>
