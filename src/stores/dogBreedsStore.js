import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { upperFirst } from 'lodash-es'
import LOCAL_STORAGE_KEYS from '@/constants/local-storage.consstants'
import { getFirstUpperCaseSymbol } from '@/helpers/getFirstUpperCaseSymbol'
import * as api from '@/api/dog-breeds/dog-breeds'

function getDogBreedsFavoritesFromStorage() {
  const dogBreedsFavorites = localStorage.getItem(LOCAL_STORAGE_KEYS.DogBreedsFavorites)

  return JSON.parse(dogBreedsFavorites) || []
}

function updateStorageFavorites(dogBreeds) {
  localStorage.setItem(LOCAL_STORAGE_KEYS.DogBreedsFavorites, JSON.stringify(dogBreeds))
}

function getDogBreedsItemTemplate(breed, subBreed = null, img = null) {
  const name = [upperFirst(breed), upperFirst(subBreed)].filter(Boolean).join(' ')
  const key = [breed, subBreed].filter(Boolean).join('-')
  const dogFavorites = getDogBreedsFavoritesFromStorage()
  const isFavorite = img && dogFavorites.length && dogFavorites.some(dog => dog.img === img)

  return {
    breed,
    subBreed,
    name,
    key,
    isFavorite,
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
  const dogBreedsList = ref([])
  const dogBreedsFavorites = ref(getDogBreedsFavoritesFromStorage())
  const dogsListByBreed = ref([])

  const getDogBreedByKey = key => dogBreedsList.value.find(breed => breed.key === key)
  const dogBreedsGroupedAlphabetically = computed(() => dogBreedsList.value.reduce((accumulator, breed) => {
    const group = getFirstUpperCaseSymbol(breed.name)

    return {
      ...accumulator,
      [group]: [...(accumulator[group] || []), breed],
    }
  }, {}))

  /** **************************************************
   * MUTATIONS
   * **************************************************/
  function UPDATE_ELEMENT_DOG_BREEDS_LIST(dogToUpdate) {
    const dogIndex = dogBreedsList.value.findIndex(({ key }) => key === dogToUpdate.key)
    const dogInList = dogBreedsList.value[dogIndex]

    if (dogInList)
      dogBreedsList.value[dogIndex] = Object.assign(dogInList, dogToUpdate)
  }

  function UPDATE_ELEMENT_DOGS_LIST_BY_BREED(dogToUpdate) {
    const dogIndex = dogsListByBreed.value.findIndex(({ img }) => img === dogToUpdate.img)
    const dogInList = dogsListByBreed.value[dogIndex]

    if (dogInList)
      dogsListByBreed.value[dogIndex] = Object.assign(dogInList, dogToUpdate)
  }

  function updateFavoriteState({ dog, favoriteState }) {
    const updatedDog = { ...dog, isFavorite: favoriteState }

    updateStorageFavorites(dogBreedsFavorites)
    UPDATE_ELEMENT_DOG_BREEDS_LIST(updatedDog)
    UPDATE_ELEMENT_DOGS_LIST_BY_BREED(updatedDog)
  }
  function ADD_DOG_BREEDS_ITEM_TO_FAVOURITE({ dog, favoriteState }) {
    dogBreedsFavorites.value.push({
      ...dog,
      isFavorite: favoriteState,
    })
    updateFavoriteState({ dog, favoriteState })
  }

  function REMOVE_DOG_BREEDS_ITEM_FROM_FAVOURITE({ dog, favoriteState }) {
    const favoriteDogIndex = dogBreedsFavorites.value.findIndex(({ img }) => img === dog.img)
    dogBreedsFavorites.value.splice(favoriteDogIndex, 1)
    updateFavoriteState({ dog, favoriteState })
  }

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

  async function fetchDogBreedImages(dogBreedKey) {
    const { breed, subBreed } = getDogBreedByKey(dogBreedKey)
    dogsListByBreed.value = []
    const dogBreedImages = await api.fetchDogBreedImages({
      breed,
      subBreed,
    })

    dogsListByBreed.value = dogBreedImages.map(dogImage => getDogBreedsItemTemplate(breed, subBreed, dogImage))
  }

  function handleFavouriteStateChange({ dog, favoriteState }) {
    const hasFavorite = dogBreedsFavorites.value.length && dogBreedsFavorites.value.some(
      ({ img }) => img === dog.img,
    )

    if (hasFavorite)
      REMOVE_DOG_BREEDS_ITEM_FROM_FAVOURITE({ dog, favoriteState })
    else
      ADD_DOG_BREEDS_ITEM_TO_FAVOURITE({ dog, favoriteState })
  }

  return {
    // getters
    dogBreedsList,
    dogBreedsFavorites,
    dogsListByBreed,
    getDogBreedByKey,
    dogBreedsGroupedAlphabetically,
    // actions
    fetchDogBreedsList,
    fetchDogBreedImageRandom,
    fetchDogBreedImages,
    handleFavouriteStateChange,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useDogBreedsStore, import.meta.hot))
