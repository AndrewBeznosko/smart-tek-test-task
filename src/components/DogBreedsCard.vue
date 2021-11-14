<template>
  <MediaCard
    :img="dog.img"
    :name="dog.name"
    :is-favorite="dog.isFavorite"
    @favorite="handleFavoriteClick"
  />
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'DogBreedsCard',
  props: {
    dog: {
      type: Object,
      default: () => ({}),
      required: true,
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
