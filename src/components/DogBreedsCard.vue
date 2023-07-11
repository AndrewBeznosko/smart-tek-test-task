<template>
  <BaseMediaCard
    :img="dog.img"
    :name="dog.name"
    :is-favorite="dog.isFavorite"
    :navigate-to="dogBreedRoute"
    :lg-size="lgSize"
    @favorite="(favoriteState) => handleFavouriteStateChange({ favoriteState, dog })"
  />
</template>

<script>
import { mapActions } from 'vuex';
import ROUTE from '@/constants/route-names.constants';
import BaseMediaCard from '@/components/base/BaseMediaCard.vue';

export default {
  name: 'DogBreedsCard',
  components: {BaseMediaCard},

  props: {
    dog: {
      type: Object,
      default: () => ({}),
      required: true,
    },
    lgSize: {
      type: Boolean,
      default: false,
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
  },

  created() {
    this.fetchDogBreedImageRandom(this.dog);
  },
};
</script>
