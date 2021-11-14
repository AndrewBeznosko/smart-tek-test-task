<template>
  <MediaCard
    :img="breedImg"
    :name="breed.name"
    @favorite="handleFavoriteClick"
  />
</template>

<script>
import { mapActions } from 'vuex';
import { fetchDogBreedImages } from '@/api/dog-breeds/dog-breeds';

export default {
  name: 'DogBreedsCard',
  props: {
    breed: {
      type: Object,
      default: () => ({}),
      required: true,
    },
  },
  data: () => ({
    breedImg: null,
  }),
  methods: {
    ...mapActions('dogBreeds', ['handleFavouriteStateChange']),

    handleFavoriteClick(favoriteState) {
      this.handleFavouriteStateChange({
        breed: this.breed,
        breedImg: this.breedImg,
        favoriteState,
      });
    },
  },
  async created() {
    this.breedImg = await fetchDogBreedImages({
      breed: this.breed.breed,
      subBreed: this.breed.subBreed,
      isRandom: true,
    });
  },
};
</script>
