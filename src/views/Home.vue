<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <DogsGrid msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import DogsGrid from '@/components/DogsGrid.vue';

export default {
  name: 'Home',
  components: {
    DogsGrid,
  },
};
</script>
