import {upperFirst} from 'lodash-es';
import { fetchDogBreedImages, fetchDogBreedsList } from '@/api/dog-breeds/dog-breeds';
import LOCAL_STORAGE_KEYS from '@/constants/local-storage.consstants';

const getDogBreedsFavoritesFromStorage = () => {
  const dogBreedsFavorites = localStorage.getItem(LOCAL_STORAGE_KEYS.DogBreedsFavorites);

  return JSON.parse(dogBreedsFavorites) || [];
};

const updateStorageFavorites = (dogBreeds) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.DogBreedsFavorites, JSON.stringify(dogBreeds));
};

const getDogBreedsItemTemplate = (breed, subBreed = null, img = null) => {
  const name = [upperFirst(breed), upperFirst(subBreed)].filter(Boolean).join(' ');
  const key = [breed, subBreed].filter(Boolean).join('-');
  const dogFavorites = getDogBreedsFavoritesFromStorage();
  const isFavorite = img && dogFavorites.length && dogFavorites.some((dog) => dog.img === img);

  return {
    breed,
    subBreed,
    name,
    key,
    isFavorite,
    img,
  };
};

const patchAllBreedsList = (allBreedsList) => Object.entries(allBreedsList)
  .reduce((accumulator, [breed, subBreeds]) => {
    if (subBreeds.length) {
      const breedsWithSubBreedsArr = subBreeds.map(
        (subBreed) => getDogBreedsItemTemplate(breed, subBreed),
      );

      return [...accumulator, ...breedsWithSubBreedsArr];
    }

    return [...accumulator, getDogBreedsItemTemplate(breed)];
  }, []);

const getFirstSymbol = (str) => str.charAt(0).toUpperCase();

const UPDATE_ELEMENT_DOG_BREEDS_LIST = (state, dogToUpdate) => {
  const dogIndex = state.dogBreedsList.findIndex(({ key }) => key === dogToUpdate.key);
  const dogInList = state.dogBreedsList[dogIndex];

  if (dogInList) {
    state.dogBreedsList[dogIndex] = Object.assign(dogInList, dogToUpdate);
  }
};

const UPDATE_ELEMENT_DOGS_LIST_BY_BREED = (state, dogToUpdate) => {
  const dogIndex = state.dogsListByBreed.findIndex(({ img }) => img === dogToUpdate.img);
  const dogInList = state.dogsListByBreed[dogIndex];

  if (dogInList) {
    state.dogsListByBreed[dogIndex] = Object.assign(dogInList, dogToUpdate);
  }
};

const updateFavoriteState = (state, { dog, favoriteState }) => {
  const updatedDog = { ...dog, isFavorite: favoriteState };

  updateStorageFavorites(state.dogBreedsFavorites);
  UPDATE_ELEMENT_DOG_BREEDS_LIST(state, updatedDog);
  UPDATE_ELEMENT_DOGS_LIST_BY_BREED(state, updatedDog);
};

export default {
  namespaced: true,

  state: {
    dogBreedsList: [],
    dogBreedsFavorites: getDogBreedsFavoritesFromStorage(),
    dogsListByBreed: [],
  },

  mutations: {
    SET_DOG_BREEDS_LIST(state, dogBreedsList) {
      state.dogBreedsList = dogBreedsList;
    },

    SET_DOGS_LIST_BY_BREED(state, dogsListByBreed) {
      state.dogsListByBreed = dogsListByBreed;
    },

    ADD_DOG_BREEDS_ITEM_TO_FAVOURITE(state, { dog, favoriteState }) {
      state.dogBreedsFavorites.push({
        ...dog,
        isFavorite: favoriteState,
      });
      updateFavoriteState(state, { dog, favoriteState });
    },

    REMOVE_DOG_BREEDS_ITEM_FROM_FAVOURITE(state, { dog, favoriteState }) {
      const favoriteDogIndex = state.dogBreedsFavorites.findIndex(({ img }) => img === dog.img);
      state.dogBreedsFavorites.splice(favoriteDogIndex, 1);
      updateFavoriteState(state, { dog, favoriteState });
    },

    SET_DOG_BREED_IMAGE_IN_LIST(state, { dog, dogImg }) {
      const dogIndex = state.dogBreedsList.findIndex(({ key }) => key === dog.key);
      const dogInList = state.dogBreedsList[dogIndex];

      if (dogInList) {
        dogInList.img = dogImg;
      }
    },

    UPDATE_ELEMENT_DOG_BREEDS_LIST,
    UPDATE_ELEMENT_DOGS_LIST_BY_BREED,
  },

  actions: {
    async fetchDogBreedsList({ commit }) {
      const allBreedsList = await fetchDogBreedsList();
      commit('SET_DOG_BREEDS_LIST', patchAllBreedsList(allBreedsList));
    },

    async fetchDogBreedImageRandom({ commit }, dog) {
      const { breed, subBreed } = dog;
      commit('SET_DOG_BREED_IMAGE_IN_LIST', { dog, dogImg: null });
      const dogImg = await fetchDogBreedImages({
        breed,
        subBreed,
        isRandom: true,
      });
      commit('SET_DOG_BREED_IMAGE_IN_LIST', { dog, dogImg });

      return dogImg;
    },

    async fetchDogBreedImages({ getters, commit }, dogBreedKey) {
      const { breed, subBreed } = getters.getDogBreedByKey(dogBreedKey);
      commit('SET_DOGS_LIST_BY_BREED', []);
      const dogBreedImages = await fetchDogBreedImages({
        breed,
        subBreed,
      });
      const dogsListByBreed = dogBreedImages.map((dogImage) => getDogBreedsItemTemplate(breed, subBreed, dogImage));

      commit('SET_DOGS_LIST_BY_BREED', dogsListByBreed);
    },

    handleFavouriteStateChange({ commit, state }, { dog, favoriteState }) {
      const hasFavorite = state.dogBreedsFavorites.length && state.dogBreedsFavorites.some(
        ({ img }) => img === dog.img,
      );

      if (hasFavorite) {
        commit('REMOVE_DOG_BREEDS_ITEM_FROM_FAVOURITE', { dog, favoriteState });
      } else {
        commit('ADD_DOG_BREEDS_ITEM_TO_FAVOURITE', { dog, favoriteState });
      }
    },
  },

  getters: {
    dogBreedsList: ({ dogBreedsList }) => dogBreedsList,

    dogBreedsFavorites: ({ dogBreedsFavorites }) => dogBreedsFavorites,

    dogsListByBreed: ({ dogsListByBreed }) => dogsListByBreed,

    getDogBreedByKey: ({ dogBreedsList }) => (key) => dogBreedsList.find((breed) => breed.key === key),

    dogBreedsGroupedAlphabetically: ({ dogBreedsList }) => dogBreedsList.reduce((accumulator, breed) => {
      const group = getFirstSymbol(breed.name);

      return {
        ...accumulator,
        [group]: [...(accumulator[group] || []), breed],
      };
    }, {}),
  },
};
