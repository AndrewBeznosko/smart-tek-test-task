<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import ROUTE_NAMES from '@/constants/route-names.constants'
import BaseMediaCard from '@/components/base/BaseMediaCard.vue'
import { useDogBreedsStore } from '@/stores/dogBreedsStore'
import type { DogBreed } from '@/types/DogBreed'
import { fetchDogRandomImage } from '@/api/dog-breeds/dog-breeds'

const props = defineProps<{
  dog: DogBreed
  lgSize?: boolean
}>()

const dogBreedsStore = useDogBreedsStore()
const dogRandomImage = ref<string>('')

const dogBreedRoute = computed(() => {
  return {
    name: ROUTE_NAMES.BreedsItem,
    params: { breed: props.dog.key },
  }
})

watchEffect(async () => {
  if (props.dog.breed)
    dogRandomImage.value = await fetchDogRandomImage(props.dog.breed, props.dog.subBreed)
})
</script>

<template>
  <BaseMediaCard
    :img="dogRandomImage"
    :name="dog.name"
    :is-favorite="dogBreedsStore.isDogBreedFavorite(dog)"
    :navigate-to="dogBreedRoute"
    :lg-size="lgSize"
    @update:is-favorite="(isFavorite) => dogBreedsStore.updateDogBreedsFavorites(isFavorite, dog)"
  />
</template>
