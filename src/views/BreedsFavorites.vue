<template>
  <div class="breeds-favorites">
    <MediaCardsGrid v-if="dogBreedsFavorites.length">
      <MediaCard
        v-for="dog in dogBreedsFavorites"
        :key="dog.img"
        :img="dog.img"
        :name="dog.name"
        :is-favorite="dog.isFavorite"
        @favorite="(favoriteState) => handleFavouriteStateChange({ favoriteState, dog })"
      />
    </MediaCardsGrid>
    <h2 v-if="!dogBreedsFavorites.length">
      There is no favorite image
    </h2>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'BreedsFavorites',
  computed: {
    ...mapGetters('dogBreeds', ['dogBreedsFavorites']),
  },
  methods: {
    ...mapActions('dogBreeds', ['handleFavouriteStateChange']),
  },
};
</script>
