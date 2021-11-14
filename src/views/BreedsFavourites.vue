<template>
  <div class="breeds-favourites">
    <MediaCardsGrid v-if="dogBreedsFavourites.length">
      <MediaCard
        v-for="breed in dogBreedsFavourites"
        :key="breed.key"
        :img="breed.img"
        :name="breed.name"
      />
    </MediaCardsGrid>
    <h2 v-if="!dogBreedsFavourites.length">
      There is no favorite image
    </h2>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'BreedsFavourites',
  computed: {
    ...mapGetters('dogBreeds', ['dogBreedsFavourites']),
  },
};
</script>

<style lang="scss" scoped>
  .breeds-favourites {

  }
</style>
