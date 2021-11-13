<template>
  <div class="breeds-page">
    <div class="breeds-page__nav">
<!--      -->
    </div>
    <DogsGrid
      class="breeds-page__dogs-grid"
      :dogs-list="dogsList"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import DogsGrid from '@/components/DogsGrid.vue';

export default {
  name: 'Home',
  components: {
    DogsGrid,
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
  .breeds-page {
    &__nav {
      margin-bottom: 50px;
    }

    &__dogs-grid {
      padding-bottom: 50px;
    }
  }
</style>
