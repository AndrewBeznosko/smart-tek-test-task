<template>
  <MediaCard
    :img="breedImg"
    :name="breed.name"
  />
</template>

<script>
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
  async created() {
    this.breedImg = await fetchDogBreedImages({
      breed: this.breed.breed,
      subBreed: this.breed.subBreed,
      isRandom: true,
    });
  },
};
</script>
