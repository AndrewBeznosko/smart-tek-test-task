<script lang="ts" setup>
import AppNav from "@/components/AppNav.vue";
</script>

<template>
  <div
    id="app"
    class="app"
  >
    <AppNav class="app__nav" />
    <div class="app-container">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
.app {
  padding-bottom: 5rem;

  &__nav {
    margin-bottom: 5rem;
  }
}
</style>
