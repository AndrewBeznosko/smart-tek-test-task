<template>
  <div class="breeds-favorites">
    <MediaCardsGrid v-if="dogBreedsFavorites.length">
      <MediaCard
        v-for="dog in dogBreedsFavorites"
        :key="dog.img"
        :img="dog.img"
        :name="dog.name"
        :is-favorite="dog.isFavorite"
        :navigate-to="dogBreedRoute(dog)"
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
import ROUTE from '@/router/routeNames';

export default {
  name: 'DogBreedsFavorites',

  computed: {
    ...mapGetters('dogBreeds', ['dogBreedsFavorites']),

    dogBreedRoute() {
      return ({ key }) => ({
        name: ROUTE.BreedsItem,
        params: { breed: key },
      });
    },
  },

  methods: {
    ...mapActions('dogBreeds', ['handleFavouriteStateChange']),
  },
};
</script>
