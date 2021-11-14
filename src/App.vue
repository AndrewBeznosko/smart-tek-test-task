<template>
  <div id="app" class="app">
    <AppNav class="app__nav"/>
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
.app {
  &__nav {
    margin-bottom: 5rem;
  }
}
</style>
