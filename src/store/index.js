import { createStore } from 'vuex'
// modules
import dogBreeds from './modules/dog-breeds';

const store = createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    dogBreeds,
  },
})

export default store;
