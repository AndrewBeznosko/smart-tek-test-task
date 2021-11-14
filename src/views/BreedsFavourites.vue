<template>
  <div class="breeds-favourites">
    <BreedsControlPanel class="breeds-favourites__nav">
<!--      -->
    </BreedsControlPanel>
    <MediaCardsGrid>
      <DogsGridItem
        v-for="(breed, i) in dogBreedsList"
        :key="i"
        :breed="breed"
      />
    </MediaCardsGrid>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BreedsControlPanel from '@/components/BreedsControlPanel.vue';

export default {
  name: 'BreedsFavourites',
  components: {
    BreedsControlPanel,
  },
  computed: {
    ...mapGetters('dogBreeds', ['dogBreedsList']),
  },
  methods: {
    ...mapActions('dogBreeds', ['fetchDogBreedsList']),
  },
  created() {
    this.fetchDogBreedsList();
  },
};
</script>

<style lang="scss" scoped>
  .breeds-favourites {
    &__nav {
      margin-bottom: 5rem;
    }
  }
</style>
