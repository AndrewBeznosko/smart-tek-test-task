<template>
  <MediaCard
    :img="breedImg"
    :name="breedName"
  />
</template>

<script>
export default {
  name: 'DogsGridItem',
  props: {
    breed: {
      type: [String, Array],
      default: () => [],
    },
  },
  data: () => ({
    breedImg: null,
  }),
  computed: {
    breedName() {
      if (Array.isArray(this.breed) && this.breed.length) {
        return this.breed.join(' ');
      }
      return this.breed;
    },
  },
  methods: {
    // fetchDogImage
  },
  created() {
    // fetchDogImage
  },
};
</script>
