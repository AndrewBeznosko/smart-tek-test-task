<script setup lang="ts">
import { computed, onMounted, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DogBreedsControlPanel from '@/components/DogBreedsControlPanel.vue'
import ROUTE_NAMES from '@/constants/route-names.constants'
import BaseInfiniteScroll from '@/components/base/BaseInfiniteScroll.vue'
import BaseMediaCardsGrid from '@/components/base/BaseMediaCardsGrid.vue'
import BaseMediaCard from '@/components/base/BaseMediaCard.vue'
import BaseBadge from '@/components/base/BaseBadge.vue'
import vuexStore from '@/store/index.js'

const router = useRouter()
const route = useRoute()

const getDogBreedByKey = computed(() => vuexStore.getters['dogBreeds/getDogBreedByKey'])
const dogBreedsList = computed(() => vuexStore.getters['dogBreeds/dogBreedsList'])
const dogsListByBreed = computed(() => vuexStore.getters['dogBreeds/dogsListByBreed'])
const fetchDogBreedsList = ({ dog, favoriteState }) => vuexStore.dispatch('dogBreeds/fetchDogBreedsList', { dog, favoriteState })
const handleFavouriteStateChange = ({ dog, favoriteState }) => vuexStore.dispatch('dogBreeds/handleFavouriteStateChange', { dog, favoriteState })
const fetchDogBreedImages = ({ dog, favoriteState }) => vuexStore.dispatch('dogBreeds/fetchDogBreedImages', { dog, favoriteState })

const dogBreedKey = computed(() => route.params?.breed)

const dogBreedInfo = computed(() => getDogBreedByKey.value(dogBreedKey) || {})

const isShowDogs = computed(() => Boolean(dogsListByBreed.value.length))

watchEffect(() => fetchDogBreedImages(dogBreedKey))

function navigateToAllBreeds() {
  router.push({ name: ROUTE_NAMES.Breeds })
}

onMounted(async () => {
  await fetchDogBreedsList()

  if (dogBreedsList.value.length)
    await fetchDogBreedImages(dogBreedKey)
})
</script>

<template>
  <div v-if="dogBreedsList.length">
    <DogBreedsControlPanel :active-dog-breed="dogBreedInfo">
      <template #left-controls>
        <BaseBadge
          :name="dogBreedInfo.name"
          icon="close"
          is-active
          @click="navigateToAllBreeds"
        />
      </template>
    </DogBreedsControlPanel>
    <transition name="fade">
      <BaseInfiniteScroll
        v-if="isShowDogs"
        v-slot="{ items: dogsListByBreedLimited }"
        :items="dogsListByBreed"
        :limit-by="20"
      >
        <BaseMediaCardsGrid>
          <BaseMediaCard
            v-for="dog in dogsListByBreedLimited"
            :key="dog.img"
            :img="dog.img"
            :name="dog.name"
            :is-favorite="dog.isFavorite"
            @favorite="(favoriteState) => handleFavouriteStateChange({ dog, favoriteState })"
          />
        </BaseMediaCardsGrid>
      </BaseInfiniteScroll>
    </transition>
  </div>
</template>
