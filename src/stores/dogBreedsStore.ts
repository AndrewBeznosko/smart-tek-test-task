import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
import { upperFirst } from 'lodash-es'
import { useStorage } from '@vueuse/core'
import LOCAL_STORAGE_KEYS from '@/constants/local-storage.consstants'
import * as api from '@/api/dog-breeds/dog-breeds'
import type { DogBreed } from '@/types/DogBreed'
import type { DogBreedsList } from '@/api/dog-breeds/dog-breeds'

function getDogBreedsItemTemplate(
  breed: string,
  subBreed?: string,
  img?: string,
): DogBreed {
  const name = [upperFirst(breed), upperFirst(subBreed)].filter(Boolean).join(' ')
  const key = [breed, subBreed].filter(Boolean).join('-')

  return {
    breed,
    subBreed,
    name,
    key,
    img,
  }
}

function reformatBreedsListToFlatArray(allBreedsList: DogBreedsList): DogBreed[] {
  return Object.entries(allBreedsList)
    .reduce((accumulator: DogBreed[], [breed, subBreeds]) => {
      if (subBreeds.length) {
        const breedsWithSubBreedsArr = subBreeds.map(
          subBreed => getDogBreedsItemTemplate(breed, subBreed),
        )

        return [...accumulator, ...breedsWithSubBreedsArr]
      }

      return [...accumulator, getDogBreedsItemTemplate(breed)]
    }, [])
}

export const useDogBreedsStore = defineStore('dogBreedsStore', () => {
  const dogBreedsList = ref<DogBreed[]>([])
  const dogBreedsFavorites = useStorage<DogBreed[]>(LOCAL_STORAGE_KEYS.DogBreedsFavorites, [])

  /** **************************************************
   * GETTERS
   * **************************************************/
  function getDogBreedByKey(key: string) {
    return dogBreedsList.value.find(breed => breed.key === key)
  }

  function findDogBreedIndexInFavorites(dogBreed: DogBreed): number {
    return dogBreedsFavorites.value.findIndex(({ key }) => key === dogBreed.key)
  }

  function isDogBreedFavorite(dogBreed: DogBreed): boolean {
    return findDogBreedIndexInFavorites(dogBreed) > -1
  }

  /** **************************************************
   * ACTIONS
   * **************************************************/
  async function fetchDogBreedsList() {
    const breeds = await api.fetchDogBreedsList()
    dogBreedsList.value = reformatBreedsListToFlatArray(breeds)
  }

  function updateDogBreedsFavorites(favoriteState: boolean, dogBreed: DogBreed): void {
    const index = findDogBreedIndexInFavorites(dogBreed)

    if (index > -1)
      dogBreedsFavorites.value.splice(index, 1)
    else
      dogBreedsFavorites.value.push(dogBreed)
  }

  return {
    // getters
    dogBreedsList,
    dogBreedsFavorites,
    getDogBreedByKey,
    isDogBreedFavorite,
    // actions
    fetchDogBreedsList,
    updateDogBreedsFavorites,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useDogBreedsStore, import.meta.hot))
