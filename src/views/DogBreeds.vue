<script setup lang="ts">
import { shuffle } from 'lodash-es'
import { computed, ref } from 'vue'
import DogBreedsControlPanel from '@/components/DogBreedsControlPanel.vue'
import DogBreedsCard from '@/components/DogBreedsCard.vue'
import BaseSwitch from '@/components/base/BaseSwitch.vue'
import BaseInfiniteScroll from '@/components/base/BaseInfiniteScroll.vue'
import BaseMediaCardsGrid from '@/components/base/BaseMediaCardsGrid.vue'
import vuexStore from '@/store/index.js'

const dogBreedsList = computed(() => vuexStore.getters['dogBreeds/dogBreedsList'])
const fetchDogBreedsList = () => vuexStore.dispatch('dogBreeds/fetchDogBreedsList')

const sortByAlphabet = ref(false)
const dogList = computed(() => sortByAlphabet.value
  ? dogBreedsList.value
  : shuffle(dogBreedsList.value))

fetchDogBreedsList()
</script>

<template>
  <div class="breeds">
    <template v-if="dogBreedsList.length">
      <DogBreedsControlPanel>
        <template #right-controls>
          <BaseSwitch v-model="sortByAlphabet">
            <template #label-before>
              <span>
                <span class="breeds__sort-word">Сортировка</span>
                по алфавиту
              </span>
            </template>
          </BaseSwitch>
        </template>
      </DogBreedsControlPanel>
      <BaseInfiniteScroll
        v-slot="{ items: dogListLimited }"
        :items="dogList"
        :limit-by="20"
      >
        <BaseMediaCardsGrid has-first-media-large>
          <DogBreedsCard
            v-for="(dog, index) in dogListLimited"
            :key="dog.key"
            class="cell"
            :dog="dog"
            :lg-size="index === 0"
          />
        </BaseMediaCardsGrid>
      </BaseInfiniteScroll>
    </template>
    <h2 v-if="!dogBreedsList.length">
      The dog breeds list is empty
    </h2>
  </div>
</template>

<style lang="scss" scoped>
  .breeds {
    &__sort-word {
      display: none;

      @include tablet-and-more {
        display: inline;
      }
    }
  }
</style>
