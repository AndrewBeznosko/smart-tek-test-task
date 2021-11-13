<template>
  <MediaCard
    :img="breedImg"
    :name="breedName"
  />
</template>

<script>
import { fetchDogBreedImage } from '@/api/dogs';
import { isNotEmptyArray } from '@/helpers';

export default {
  name: 'DogsGridItem',
  props: {
    breed: {
      type: [String, Array],
      default: () => [],
      required: true,
    },
  },
  data: () => ({
    breedImg: null,
  }),
  computed: {
    breedName() {
      if (isNotEmptyArray(this.breed)) {
        return this.breed.join(' ');
      }
      return this.breed;
    },
  },
  async created() {
    const breed = isNotEmptyArray(this.breed)
      ? this.breed.join('/')
      : this.breed;

    this.breedImg = await fetchDogBreedImage({ breed });
  },
};
</script>
