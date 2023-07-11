<template>
  <div class="breeds-favorites">
    <BaseInfiniteScroll
      v-if="dogBreedsFavorites.length"
      v-slot="{ items: dogBreedsFavoritesLimited }"
      :items="dogBreedsFavorites"
      :limit-by="20"
    >
      <BaseMediaCardsGrid>
        <BaseMediaCard
          v-for="dog in dogBreedsFavoritesLimited"
          :key="dog.img"
          :img="dog.img"
          :name="dog.name"
          :is-favorite="dog.isFavorite"
          :navigate-to="dogBreedRoute(dog)"
          @favorite="(favoriteState) => handleFavouriteStateChange({ favoriteState, dog })"
        />
      </BaseMediaCardsGrid>
    </BaseInfiniteScroll>
    <h2 v-if="!dogBreedsFavorites.length">
      There is no favorite image
    </h2>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ROUTE from '@/constants/route-names.constants';
import BaseInfiniteScroll from '@/components/base/BaseInfiniteScroll.vue';
import BaseMediaCardsGrid from '@/components/base/BaseMediaCardsGrid.vue';
import BaseMediaCard from '@/components/base/BaseMediaCard.vue';

export default {
  name: 'DogBreedsFavorites',
  components: {BaseMediaCard, BaseMediaCardsGrid, BaseInfiniteScroll},

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
