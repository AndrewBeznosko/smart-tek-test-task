<script setup lang="ts">
import BaseInfiniteScroll from '@/components/base/BaseInfiniteScroll.vue'
import BaseMediaCardsGrid from '@/components/base/BaseMediaCardsGrid.vue'
import { useDogBreedsStore } from '@/stores/dogBreedsStore'
import DogBreedsCard from '@/components/DogBreedsCard.vue'
import type { DogBreed } from '@/types/DogBreed'

const dogBreedsStore = useDogBreedsStore()
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
        <DogBreedsCard
          v-for="dog in dogBreedsFavoritesLimited as DogBreed[]"
          :key="dog.img"
          :dog="dog"
          is-favorite
        />
      </BaseMediaCardsGrid>
    </BaseInfiniteScroll>
    <h2 v-if="!dogBreedsStore.dogBreedsFavorites.length">
      There is no favorite image
    </h2>
  </div>
</template>
