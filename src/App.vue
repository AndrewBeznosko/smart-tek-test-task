<template>
  <div id="app">
    <AppNav/>
    <div class="app-container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import AppNav from '@/components/AppNav.vue';

export default {
  components: { AppNav },
};
</script>

<style lang="scss">
#app {
  font-family: 'IBM Plex Sans';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff; // TODO: move to variables
  background: #1B1A1F linear-gradient(180deg, #1B1A1F 0%, #111013 99.09%);
  min-height: 100vh;
}
</style>
