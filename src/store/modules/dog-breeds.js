import upperFirst from 'lodash.upperfirst';
import { fetchDogBreedsList } from '@/api/dog-breeds/dog-breeds';
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
    ADD_DOG_BREEDS_ITEM_TO_FAVOURITE(state, { breed, image }) {
      state.dogBreedsFavourites.push({
        ...breed,
        image,
      });
      localStorage.setItem(LOCAL_STORAGE_KEYS.DogBreedsFavourites, JSON.stringify(state.dogBreedsFavourites));
    },
  },
  actions: {
    async fetchDogBreedsList({ commit }) {
      const allBreedsList = await fetchDogBreedsList();
      commit('SET_DOG_BREEDS_LIST', patchAllBreedsList(allBreedsList));
    },

    handleFavouriteStateChange({ commit, state }, { breed, breedImg, favoriteState }) {
      const alreadyHasFavorite = state.dogBreedsFavourites.find(({ key }) => key === breed.key);

      if (!alreadyHasFavorite) {
        commit('ADD_DOG_BREEDS_ITEM_TO_FAVOURITE', { breed, breedImg, favoriteState });
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
