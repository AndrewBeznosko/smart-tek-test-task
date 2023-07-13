<script setup lang="ts">
import { computed, onMounted } from 'vue'
import ROUTE_NAMES from '@/constants/route-names.constants'
import BaseMediaCard from '@/components/base/BaseMediaCard.vue'
import vuexStore from '@/store'

interface Dog {
  img: string
  name: string
  isFavorite: string
  key: string | number
}

const props = defineProps<{
  dog: Dog
  lgSize?: boolean
}>()
const handleFavouriteStateChange = ({ favoriteState, dog }) => vuexStore.dispatch('dogBreeds/handleFavouriteStateChange', { favoriteState, dog })
const fetchDogBreedImageRandom = (dog?: Dog) => vuexStore.dispatch('dogBreeds/fetchDogBreedImageRandom', dog)

const dogBreedRoute = computed(() => {
  return {
    name: ROUTE_NAMES.BreedsItem,
    params: { breed: props.dog.key },
  }
})

onMounted(() => {
  fetchDogBreedImageRandom(props.dog)
})
</script>

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
