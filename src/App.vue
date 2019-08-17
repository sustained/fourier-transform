<template>
  <div id="app">
    <navigation />

    <router-view />
  </div>
</template>

<script>
import Navigation from "@/components/layout/Navigation";

export default {
  name: "App",

  components: { Navigation }
};
</script>

<style lang="scss">
@import "@/assets/styles/app.scss";
</style>
