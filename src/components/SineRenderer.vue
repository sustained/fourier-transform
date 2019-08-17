<template>
  <div>
    <canvas ref="canvas" :width="width" :height="height"></canvas>
  </div>
</template>

<script>
import bus from "@/library/EventBus";

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

    iterations: {
      type: [Number, String],
      default: 1.0,
      validator(value) {
        return value >= 1.0;
      }
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
      const numSections = 16;
      const sectionWidth = this.width / numSections;

      for (let x = 0; x < numSections; x ++) {
        context.beginPath();
        context.moveTo(x * sectionWidth, this.height - 20);
        context.lineTo(x * sectionWidth, this.height);
        context.stroke();
        context.lineWidth = x % 4 === 3 ? 3.0 : 1.0;
        context.closePath();
      }
    },

    drawSineWave(context) {
      context.beginPath();
      for (let x = 0; x <= 360; x += 1) {
        const y =
          this.halfHeight -
          (Math.sin((x * this.iterations * Math.PI) / 180) * this.waveHeight) /
            2;
        context.lineTo(x * this.scaleFactorX, y);
      }
      context.lineWidth = 1.0;
      context.stroke();
      context.closePath();

      window.requestAnimationFrame(this.render);
    }
  }
};
</script>
