<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DogBreedsControlPanel from '@/components/DogBreedsControlPanel.vue'
import ROUTE_NAMES from '@/constants/route-names.constants'
import BaseInfiniteScroll from '@/components/base/BaseInfiniteScroll.vue'
import BaseMediaCardsGrid from '@/components/base/BaseMediaCardsGrid.vue'
import BaseBadge from '@/components/base/BaseBadge.vue'
import { useDogBreedsStore } from '@/stores/dogBreedsStore'
import DogBreedsCard from '@/components/DogBreedsCard.vue'
import { fetchDogImages } from '@/api/dog-breeds/dog-breeds'
import type { DogBreed } from '@/types/DogBreed'

const router = useRouter()
const route = useRoute()

const dogBreedsStore = useDogBreedsStore()
const dogBreedKey = computed(() => route.params.breed as string)
const dogBreedInfo = computed<DogBreed>(() => dogBreedsStore.getDogBreedByKey(dogBreedKey.value) || {})
const dogBreedImages = ref<string[]>([])
const isShowDogs = computed(() => Boolean(dogBreedImages.value.length))

watchEffect(() => fetchDogBreedImages(dogBreedKey.value))

function navigateToAllBreeds() {
  router.push({ name: ROUTE_NAMES.Breeds })
}

async function fetchDogBreedImages(breed: string) {
  const images = await fetchDogImages({ breed })
  dogBreedImages.value = images as string[]
}
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
        v-slot="{ items: dogsImages }"
        :items="dogBreedImages"
        :limit-by="20"
      >
        <BaseMediaCardsGrid>
          <DogBreedsCard
            v-for="img in dogsImages as string[]"
            :key="img"
            :dog="{ img }"
          />
        </BaseMediaCardsGrid>
      </BaseInfiniteScroll>
    </transition>
  </div>
</template>
