<template>
  <div class="card">
    <header class="card-header">
      <h2 class="card-header-title">Sine Waves</h2>
    </header>

    <div class="card-content">
      <ul>
        <div class="card" v-for="sine in sines" :key="sine.id">
          <header class="card-header">
            <p class="card-header-title">{{ sine.hertz }}Hz ({{ sine.scientific }})</p>

            <b-button
              icon-right="delete"
              size="is-medium"
              type="is-danger"
              class="card-header-icon"
              @click="remove(sine.id)"
            ></b-button>
          </header>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SineWaveList",

  props: ["sines"],

  methods: {
    remove(id) {
      this.$emit("remove", id);
    }
  }
};
</script>

<style>
</style>
