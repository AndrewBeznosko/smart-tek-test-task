<script setup lang="ts">
import { computed, onMounted } from 'vue'
import ROUTE_NAMES from '@/constants/route-names.constants'
import BaseMediaCard from '@/components/base/BaseMediaCard.vue'
import { useDogBreedsStore } from '@/stores/dogBreedsStore'
import type { DogBreed } from '@/types/DogBreed'

const props = defineProps<{
  dog: DogBreed
  lgSize?: boolean
}>()

const dogBreedsStore = useDogBreedsStore()

const dogBreedRoute = computed(() => {
  return {
    name: ROUTE_NAMES.BreedsItem,
    params: { breed: props.dog.key },
  }
})

onMounted(() => {
  dogBreedsStore.fetchDogBreedImageRandom(props.dog)
})
</script>

<template>
  <BaseMediaCard
    :img="dog.img"
    :name="dog.name"
    :is-favorite="dogBreedsStore.isDogBreedFavorite(dog)"
    :navigate-to="dogBreedRoute"
    :lg-size="lgSize"
    @update:is-favorite="(isFavorite) => dogBreedsStore.updateDogBreedsFavorites(isFavorite, dog)"
  />
</template>
