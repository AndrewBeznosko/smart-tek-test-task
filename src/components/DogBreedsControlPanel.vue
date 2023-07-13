<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ROUTE_NAMES from '@/constants/route-names.constants'
import BaseSvgIcon from '@/components/base/BaseSvgIcon.vue'
import BaseBadge from '@/components/base/BaseBadge.vue'
import { useDogBreedsStore } from '@/stores/dogBreedsStore'
import { getFirstUpperCaseSymbol } from '@/helpers/getFirstUpperCaseSymbol'
import type { DogBreed } from '@/types/DogBreed'

interface DogBreedsGroupedAlphabetically {
  [letter: string]: DogBreed[]
}

const props = defineProps({
  activeDogBreed: {
    type: Object,
    default: () => ({}),
  },
})
const router = useRouter()
const route = useRoute()
const dogBreedsStore = useDogBreedsStore()

const isBreedsListVisible = ref(false)

const isAllDogBreeds = computed(() => {
  return route.name === ROUTE_NAMES.Breeds
})

const activeDogBreedKey = computed(() => {
  return props.activeDogBreed?.key
})

const dogBreedsGroupedAlphabetically = computed(() => dogBreedsStore.dogBreedsList.reduce(
  (accumulator: DogBreedsGroupedAlphabetically, breed: DogBreed) => {
    const group: string = getFirstUpperCaseSymbol(breed.name)

    return {
      ...accumulator,
      [group]: [...(accumulator[group] || []), breed],
    }
  }, {},
))

function toggleBreedsListVisibility() {
  isBreedsListVisible.value = !isBreedsListVisible.value
}
function hideBreedsList() {
  isBreedsListVisible.value = false
}
function navigateToTheBreed(breed) {
  router.push({
    name: ROUTE_NAMES.BreedsItem,
    params: { breed: breed.key },
  })
  hideBreedsList()
}
function navigateToAllBreeds() {
  if (isAllDogBreeds.value)
    return

  router.push({
    name: ROUTE_NAMES.Breeds,
  })
  hideBreedsList()
}
</script>

<template>
  <div class="control-panel">
    <div class="control-panel__row">
      <div class="control-panel__row-left">
        <button
          class="control-panel__breed-btn"
          type="button"
          @click="toggleBreedsListVisibility"
        >
          Породы
          <BaseSvgIcon
            class="control-panel__breed-btn-icon"
            :class="{ 'control-panel__breed-btn-icon--opened': isBreedsListVisible }"
            name="arrow-down"
            width="9"
            height="5"
          />
        </button>
        <slot name="left-controls" />
      </div>
      <div class="control-panel__row-right">
        <slot name="right-controls" />
      </div>
    </div>
    <transition name="collapse">
      <div
        v-if="isBreedsListVisible"
        class="control-panel__breeds"
      >
        <BaseBadge
          name="Все пёсели"
          :is-active="isAllDogBreeds"
          @click="navigateToAllBreeds"
        />
        <div class="control-panel__breeds-list">
          <template
            v-for="(group, key) in dogBreedsGroupedAlphabetically"
            :key="key"
          >
            <div
              class="control-panel__breeds-alphabet-group-letter"
              v-text="key"
            />
            <BaseBadge
              v-for="breed in group"
              :key="breed.name"
              class="control-panel__breeds-alphabet-group-badge"
              :name="breed.name"
              :is-active="breed.key === activeDogBreedKey"
              @click="navigateToTheBreed(breed)"
            />
          </template>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
  .control-panel {
    margin-bottom: 5rem;

    &__breed-btn {
      line-height: 2rem;
      color: var(--white);
      padding: 0.2rem 0;
      border-bottom: dashed 1px var(--white);
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    &__breed-btn-icon {
      transition: var(--animation-time);

      &--opened {
        transform: rotateX(180deg);
      }
    }

    &__breeds {
      padding-top: 3rem;
    }

    &__breeds-alphabet-group {
      display: inline-flex;
      gap: 1.5rem;
    }

    &__breeds-alphabet-group-letter {
      font-size: 2rem;
      line-height: 2.8rem;
      color: var(--light);

      &:not(:first-of-type) {
        margin-left: 2.5rem;
      }
    }

    &__breeds-list {
      margin-top: 1.7rem;
      display: inline-flex;
      align-items: center;
      gap: 1.5rem;
      flex-wrap: wrap;
    }

    &__row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__row-left {
      display: flex;
      align-items: center;
      gap: 2rem;
    }
  }
</style>
