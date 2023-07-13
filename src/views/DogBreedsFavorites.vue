<script setup lang="ts">
import { computed } from 'vue'
import ROUTE_NAMES from '@/constants/route-names.constants'
import BaseInfiniteScroll from '@/components/base/BaseInfiniteScroll.vue'
import BaseMediaCardsGrid from '@/components/base/BaseMediaCardsGrid.vue'
import BaseMediaCard from '@/components/base/BaseMediaCard.vue'
import { useDogBreedsStore } from '@/stores/dogBreedsStore'

const dogBreedsStore = useDogBreedsStore()

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
      v-if="dogBreedsStore.dogBreedsFavorites.length"
      v-slot="{ items: dogBreedsFavoritesLimited }"
      :items="dogBreedsStore.dogBreedsFavorites"
      :limit-by="20"
    >
      <BaseMediaCardsGrid>
        <BaseMediaCard
          v-for="dog in dogBreedsFavoritesLimited"
          :key="dog.img"
          :img="dog.img"
          :name="dog.name"
          :is-favorite="dogBreedsStore.isDogBreedFavorite(dog)"
          :navigate-to="dogBreedRoute(dog)"
          @update:is-favorite="(isFavorite) => dogBreedsStore.updateDogBreedsFavorites(isFavorite, dog)"
        />
      </BaseMediaCardsGrid>
    </BaseInfiniteScroll>
    <h2 v-if="!dogBreedsStore.dogBreedsFavorites.length">
      There is no favorite image
    </h2>
  </div>
</template>
