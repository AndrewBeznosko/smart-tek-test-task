<script setup lang="ts">
import { computed, onMounted, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DogBreedsControlPanel from '@/components/DogBreedsControlPanel.vue'
import ROUTE_NAMES from '@/constants/route-names.constants'
import BaseInfiniteScroll from '@/components/base/BaseInfiniteScroll.vue'
import BaseMediaCardsGrid from '@/components/base/BaseMediaCardsGrid.vue'
import BaseMediaCard from '@/components/base/BaseMediaCard.vue'
import BaseBadge from '@/components/base/BaseBadge.vue'
import { useDogBreedsStore } from '@/stores/dogBreedsStore'

const router = useRouter()
const route = useRoute()

const dogBreedsStore = useDogBreedsStore()
const dogBreedKey = computed(() => route.params?.breed)
const dogBreedInfo = computed(() => dogBreedsStore.getDogBreedByKey(dogBreedKey) || {})
const isShowDogs = computed(() => Boolean(dogBreedsStore.dogsListByBreed.length))

watchEffect(() => dogBreedsStore.fetchDogBreedImages(dogBreedKey))

function navigateToAllBreeds() {
  router.push({ name: ROUTE_NAMES.Breeds })
}

onMounted(async () => {
  await dogBreedsStore.fetchDogBreedsList()

  if (dogBreedsStore.dogBreedsList.length)
    await dogBreedsStore.fetchDogBreedImages(dogBreedKey)
})
</script>

<template>
  <div v-if="dogBreedsStore.dogBreedsList.length">
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
        :items="dogBreedsStore.dogsListByBreed"
        :limit-by="20"
      >
        <BaseMediaCardsGrid>
          <BaseMediaCard
            v-for="dog in dogsListByBreedLimited"
            :key="dog.img"
            :img="dog.img"
            :name="dog.name"
            :is-favorite="dog.isFavorite"
            @favorite="(favoriteState) => dogBreedsStore.handleFavouriteStateChange({ dog, favoriteState })"
          />
        </BaseMediaCardsGrid>
      </BaseInfiniteScroll>
    </transition>
  </div>
</template>
