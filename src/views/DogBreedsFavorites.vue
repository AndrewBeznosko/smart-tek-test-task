<script setup lang="ts">
import { computed } from 'vue'
import ROUTE_NAMES from '@/constants/route-names.constants'
import BaseInfiniteScroll from '@/components/base/BaseInfiniteScroll.vue'
import BaseMediaCardsGrid from '@/components/base/BaseMediaCardsGrid.vue'
import BaseMediaCard from '@/components/base/BaseMediaCard.vue'
import vuexStore from '@/store/index.js'

const dogBreedsFavorites = computed(() => vuexStore.getters['dogBreeds/dogBreedsFavorites'])
const handleFavouriteStateChange = ({ dog, favoriteState }) => vuexStore.dispatch('dogBreeds/handleFavouriteStateChange', { dog, favoriteState })

const dogBreedRoute = computed(() => {
  return ({ key }) => ({
    name: ROUTE_NAMES.BreedsItem,
    params: { breed: key },
  })
})
</script>

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
