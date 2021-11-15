<template>
  <MediaCard
    :img="dog.img"
    :name="dog.name"
    :is-favorite="dog.isFavorite"
    :navigate-to="dogBreedRoute"
    @favorite="handleFavoriteClick"
  />
</template>

<script>
import { mapActions } from 'vuex';
import ROUTE from '@/router/routeNames';

export default {
  name: 'DogBreedsCard',
  props: {
    dog: {
      type: Object,
      default: () => ({}),
      required: true,
    },
  },
  computed: {
    dogBreedRoute() {
      return {
        name: ROUTE.BreedsItem,
        params: { breed: this.dog.key },
      };
    },
  },
  methods: {
    ...mapActions('dogBreeds', ['handleFavouriteStateChange', 'fetchDogBreedImageRandom']),

    handleFavoriteClick(favoriteState) {
      this.handleFavouriteStateChange({
        dog: this.dog,
        favoriteState,
      });
    },
  },
  created() {
    this.fetchDogBreedImageRandom(this.dog);
  },
};
</script>
