<template>
  <div>
    <canvas ref="canvas" :width="width" :height="height"></canvas>
  </div>
</template>

<script>
import { generateSineWave } from "@/library/Sine";

export default {
  name: "SineRenderer",

  props: {
    width: {
      type: [Number, String],
      default: 800
    },

    height: {
      type: Number,
      default: 200
    },

    sine: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      seconds: 1,
      context: null,
      generator: null
    };
  },

  computed: {
    halfHeight() {
      return this.height / 2;
    },

    waveHeight() {
      return Math.max(
        50,
        Math.min(this.height - 50, this.height - (this.sine.hertz / 2) * 20)
      );
    },

    scaleFactorX() {
      return this.width / 360;
    }
  },

  mounted() {
    this.context = this.$refs.canvas.getContext("2d");

    this.$emit("added", {
      id: this.sine.id,
      renderer: this.render
    });
  },

  beforeDestroy() {
    this.$emit("removed", {
      id: this.sine.id,
      renderer: this.render
    });
  },

  methods: {
    render() {
      const { context } = this;

      context.clearRect(0, 0, this.width, this.height);

      this.drawGraph(context);
      this.drawSineWave(context);
    },

    drawGraph(context) {
      // const numSections = this.seconds * 10;
      // const sectionWidth = this.width / numSections;
      // for (let x = 0; x < numSections; x ++) {
      //   context.beginPath();
      //   context.moveTo(x * sectionWidth, this.height - 20);
      //   context.lineTo(x * sectionWidth, this.height);
      //   context.stroke();
      //   context.lineWidth = x % 2 === 1 ? 3.0 : 1.0;
      //   context.closePath();
      // }
    },

    drawSineWave(context) {
      this.generator = generateSineWave(this.sine.hertz);

      context.beginPath();
      for (let x = 0; x <= 360 * 2; x ++) {
        const sine = this.generator.next().value;

        const y = this.halfHeight - sine.j * this.waveHeight;
        context.lineTo(sine.i * this.scaleFactorX, y);
      }
      context.lineWidth = 1.0;
      context.lineCap = "round";
      context.stroke();
      context.closePath();
    }
  }
};
</script>

<style>
canvas {
  margin-bottom: 1rem;
}
</style>
