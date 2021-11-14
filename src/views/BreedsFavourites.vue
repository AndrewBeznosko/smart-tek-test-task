<template>
  <div class="breeds-favourites">
    <!-- TODO: add breeds list -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
// import DogsGrid from '@/components/DogsGrid.vue';

export default {
  name: 'BreedsFavourites',
  components: {
    // DogsGrid,
  },
  computed: {
    ...mapGetters('dogs', ['dogsList']),
  },
  methods: {
    ...mapActions('dogs', ['fetchDogsList']),
  },
  created() {
    this.fetchDogsList();
  },
};
</script>

<style lang="scss" scoped>
  .breeds-favourites {
  //
  }
</style>
