import { fetchDogsList } from '@/api/dogs';

const patchAllBreedsList = (allBreedsList) => Object.entries(allBreedsList)
  .reduce((accumulator, [breed, subBreeds]) => {
    if (subBreeds.length) {
      const breedsWithSubBreedsArr = subBreeds.map((subBreed) => [breed, subBreed]);

      return [...accumulator, ...breedsWithSubBreedsArr];
    }

    return [...accumulator, breed];
  }, []);

export default {
  namespaced: true,

  state: {
    isLoading: false,
    dogsList: [],
  },
  mutations: {
    SET_IS_LOADING(state, payload = true) {
      state.isLoading = payload;
    },
    SET_DOGS_LIST(state, dogsList) {
      state.dogsList = dogsList;
    },
  },
  actions: {
    async fetchDogsList({ commit }) {
      commit('SET_IS_LOADING');
      const allBreedsList = await fetchDogsList();
      commit('SET_DOGS_LIST', patchAllBreedsList(allBreedsList));
      commit('SET_IS_LOADING', false); // TODO: make isLoading universal
    },
  },
  getters: {
    dogsList: ({ dogsList }) => dogsList,
  },
};
