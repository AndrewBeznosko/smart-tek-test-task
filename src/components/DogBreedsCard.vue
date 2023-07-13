<script setup lang="ts">
import { computed, onMounted } from 'vue'
import ROUTE_NAMES from '@/constants/route-names.constants'
import BaseMediaCard from '@/components/base/BaseMediaCard.vue'
import { useDogBreedsStore } from '@/stores/dogBreedsStore'

interface Dog {
  img: string
  name: string
  isFavorite: boolean
  key: string | number
}

const props = defineProps<{
  dog: Dog
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
    :is-favorite="dog.isFavorite"
    :navigate-to="dogBreedRoute"
    :lg-size="lgSize"
    @favorite="(favoriteState) => dogBreedsStore.handleFavouriteStateChange({ favoriteState, dog })"
  />
</template>
