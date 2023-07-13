import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
import { upperFirst } from 'lodash-es'
import { useStorage } from '@vueuse/core'
import LOCAL_STORAGE_KEYS from '@/constants/local-storage.consstants'
import * as api from '@/api/dog-breeds/dog-breeds'
import type { DogBreed } from '@/types/DogBreed'

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

function patchAllBreedsList(allBreedsList) {
  return Object.entries(allBreedsList)
    .reduce((accumulator, [breed, subBreeds]) => {
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
  const dogsListByBreed = ref([])
  const dogBreedsFavorites = useStorage<DogBreed[]>(LOCAL_STORAGE_KEYS.DogBreedsFavorites, [])

  /** **************************************************
   * GETTERS
   * **************************************************/
  function getDogBreedByKey(key: string) {
    return dogBreedsList.value.find(breed => breed.key === key)
  }

  function getDogBreedIndexInFavorites(dogBreed: DogBreed): number {
    return dogBreedsFavorites.value.findIndex(({ key }) => key === dogBreed.key)
  }

  function isDogBreedFavorite(dogBreed: DogBreed): boolean {
    return getDogBreedIndexInFavorites(dogBreed) > -1
  }

  /** **************************************************
   * MUTATIONS
   * **************************************************/

  function SET_DOG_BREED_IMAGE_IN_LIST({ dog, dogImg }) {
    const dogIndex = dogBreedsList.value.findIndex(({ key }) => key === dog.key)
    const dogInList = dogBreedsList.value[dogIndex]

    if (dogInList)
      dogInList.img = dogImg
  }

  /** **************************************************
   * ACTIONS
   * **************************************************/
  async function fetchDogBreedsList() {
    const allBreedsList = await api.fetchDogBreedsList()
    dogBreedsList.value = patchAllBreedsList(allBreedsList)
  }

  async function fetchDogBreedImageRandom(dog) {
    const { breed, subBreed } = dog
    SET_DOG_BREED_IMAGE_IN_LIST({ dog, dogImg: null })
    const dogImg = await api.fetchDogBreedImages({
      breed,
      subBreed,
      isRandom: true,
    })
    SET_DOG_BREED_IMAGE_IN_LIST({ dog, dogImg })

    return dogImg
  }

  async function fetchDogBreedImages(dogBreedKey: string) {
    const { breed, subBreed } = getDogBreedByKey(dogBreedKey)
    dogsListByBreed.value = []
    const dogBreedImages = await api.fetchDogBreedImages({
      breed,
      subBreed,
    })

    dogsListByBreed.value = dogBreedImages.map(dogImage => getDogBreedsItemTemplate(breed, subBreed, dogImage))
  }

  function updateDogBreedsFavorites(favoriteState: boolean, dogBreed: DogBreed): void {
    const index = getDogBreedIndexInFavorites(dogBreed)

    if (index > -1)
      dogBreedsFavorites.value.splice(index, 1)
    else
      dogBreedsFavorites.value.push(dogBreed)
  }

  return {
    // getters
    dogBreedsList,
    dogBreedsFavorites,
    dogsListByBreed,
    getDogBreedByKey,
    isDogBreedFavorite,
    // actions
    fetchDogBreedsList,
    fetchDogBreedImageRandom,
    fetchDogBreedImages,
    updateDogBreedsFavorites,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useDogBreedsStore, import.meta.hot))
