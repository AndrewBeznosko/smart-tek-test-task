import { createStore } from 'vuex';
// modules
import dogBreeds from './modules/dog-breeds';

const vuexStore = createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    dogBreeds,
  },
});

export default vuexStore;
