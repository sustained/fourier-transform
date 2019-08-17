<template>
  <div class="home">
    <div>
      <input type="range" name="iterations" min="1.0" max="30.0" step="1.0" v-model="iterations" />
      <label for="iterations">Iterations</label>
    </div>

    <sine-renderer :iterations="iterations" />
  </div>
</template>

<script>
import bus from "@/library/EventBus";
import SineRenderer from "@/components/SineRenderer";

export default {
  name: "Home",

  components: { SineRenderer },

  data() {
    return {
      iterations: 44
    };
  },

  mounted() {
    console.log("mounted");
    bus.$emit("render");
  },

  beforeDestroy() {
    bus.$off("render");
  }
};
</script>

<style>
canvas {
  border: 1px solid black;
}
</style>
