import upperFirst from 'lodash.upperfirst';
import { fetchDogBreedImages, fetchDogBreedsList } from '@/api/dog-breeds/dog-breeds';
import LOCAL_STORAGE_KEYS from '@/constants/local-storage.consstants';

const getBreedsItemTemplate = (breed, subBreed = null) => ({
  breed,
  subBreed,
  name: [
    upperFirst(breed),
    upperFirst(subBreed),
  ].filter(Boolean).join(' '),
  key: [
    breed,
    subBreed,
  ].filter(Boolean).join('-'),
  isFavorite: false,
  img: null,
});

const patchAllBreedsList = (allBreedsList) => Object.entries(allBreedsList)
  .reduce((accumulator, [breed, subBreeds]) => {
    if (subBreeds.length) {
      const breedsWithSubBreedsArr = subBreeds.map(
        (subBreed) => getBreedsItemTemplate(breed, subBreed),
      );

      return [...accumulator, ...breedsWithSubBreedsArr];
    }

    return [...accumulator, getBreedsItemTemplate(breed)];
  }, []);

const getFirstSymbol = (str) => str.charAt(0).toUpperCase();

const getDogBreedsFavouritesFromStorage = () => {
  const dogBreedsFavourites = localStorage.getItem(LOCAL_STORAGE_KEYS.DogBreedsFavourites);

  return JSON.parse(dogBreedsFavourites) || [];
};

export default {
  namespaced: true,

  state: {
    dogBreedsList: [],
    dogBreedsFavourites: getDogBreedsFavouritesFromStorage(),
  },
  mutations: {
    SET_DOG_BREEDS_LIST(state, dogBreedsList) {
      state.dogBreedsList = dogBreedsList;
    },
    ADD_DOG_BREEDS_ITEM_TO_FAVOURITE(state, { dog, favoriteState }) {
      state.dogBreedsFavourites.push({
        ...dog,
        isFavorite: favoriteState,
      });
      localStorage.setItem(LOCAL_STORAGE_KEYS.DogBreedsFavourites, JSON.stringify(state.dogBreedsFavourites));

      // TODO: refactor it
      const dogIndex = state.dogBreedsList.findIndex(({ key }) => key === dog.key);
      const dogInList = state.dogBreedsList[dogIndex];
      if (dogInList) {
        dogInList.isFavorite = favoriteState;
      }
    },
    SET_DOG_BREED_IMAGE_IN_LIST(state, { dog, dogImg }) {
      const dogIndex = state.dogBreedsList.findIndex(({ key }) => key === dog.key);
      const dogInList = state.dogBreedsList[dogIndex];

      if (dogInList) {
        dogInList.img = dogImg;
      }
    },
  },
  actions: {
    async fetchDogBreedsList({ commit }) {
      const allBreedsList = await fetchDogBreedsList();
      commit('SET_DOG_BREEDS_LIST', patchAllBreedsList(allBreedsList));
    },

    async fetchDogBreedImageRandom({ commit }, dog) {
      const { breed, subBreed } = dog;
      const dogImg = await fetchDogBreedImages({
        breed,
        subBreed,
        isRandom: true,
      });
      commit('SET_DOG_BREED_IMAGE_IN_LIST', { dog, dogImg });

      return dogImg;
    },

    handleFavouriteStateChange({ commit, state }, { dog, favoriteState }) {
      const hasFavorite = state.dogBreedsFavourites.find(({ img }) => img === dog.img);

      if (!hasFavorite) {
        commit('ADD_DOG_BREEDS_ITEM_TO_FAVOURITE', { dog, favoriteState });
      }
    },
  },
  getters: {
    dogBreedsList: ({ dogBreedsList }) => dogBreedsList,
    dogBreedsFavourites: ({ dogBreedsFavourites }) => dogBreedsFavourites,

    dogBreedsGroupedAlphabetically: ({ dogBreedsList }) => dogBreedsList.reduce((accumulator, breed) => {
      const group = getFirstSymbol(breed.name);

      return {
        ...accumulator,
        [group]: [...(accumulator[group] || []), breed],
      };
    }, {}),

    getDogBreedByKey: ({ dogBreedsList }) => (key) => dogBreedsList.find((breed) => breed.key === key),
  },
};
