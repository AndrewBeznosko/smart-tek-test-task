import upperFirst from 'lodash.upperfirst';
import { fetchDogBreedsList } from '@/api/dog-breeds/dog-breeds';

const getBreedsItemTemplate = (breed, subBreed = null) => ({
  breed,
  subBreed,
  name: [
    upperFirst(breed),
    upperFirst(subBreed),
  ].filter(Boolean).join(' '),
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

export default {
  namespaced: true,

  state: {
    dogBreedsList: [],
  },
  mutations: {
    SET_DOG_BREEDS_LIST(state, dogBreedsList) {
      state.dogBreedsList = dogBreedsList;
    },
  },
  actions: {
    async fetchDogBreedsList({ commit }) {
      const allBreedsList = await fetchDogBreedsList();
      commit('SET_DOG_BREEDS_LIST', patchAllBreedsList(allBreedsList));
    },
  },
  getters: {
    dogBreedsList: ({ dogBreedsList }) => dogBreedsList,

    dogBreedsGroupedAlphabetically: ({ dogBreedsList }) => dogBreedsList.reduce((accumulator, breed) => {
      const group = getFirstSymbol(breed.name);

      return {
        ...accumulator,
        [group]: [...(accumulator[group] || []), breed],
      };
    }, {}),
  },
};
