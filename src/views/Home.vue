<template>
  <div class="home">
    <div>
      <input type="range" name="iterations" min="1.0" step="0.25" max="20.0" v-model="iterations" />
      <label for="iterations">Iterations</label>
    </div>
    <canvas ref="canvas" id="canvas" width="800" height="600"></canvas>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      context: null,
      iterations: 1.0,
      width: 800,
      height: 600
    };
  },

  computed: {
    halfHeight() {
      return this.height / 2;
    },

    waveHeight() {
      return Math.max(this.halfHeight, this.height - this.iterations * 50);
    },

    scaleFactorX() {
      return this.width / 360;
    }
  },

  methods: {
    render() {
      const { context } = this;

      context.clearRect(0, 0, 800, 600);

      context.beginPath();
      for (let x = 0; x <= 360; x += 1) {
        const y =
          this.halfHeight -
          (Math.sin((x * this.iterations * Math.PI) / 180) * this.waveHeight) /
            2;
        context.lineTo(x * this.scaleFactorX, y);
      }
      context.stroke();
      context.closePath();

      window.requestAnimationFrame(this.render);
    }
  },

  mounted() {
    const canvas = this.$refs.canvas;
    this.context = canvas.getContext("2d");

    this.render();
  }
};
</script>

<style>
canvas {
  border: 1px solid black;
}
</style>
