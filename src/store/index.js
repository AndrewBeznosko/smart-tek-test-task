import Vue from 'vue';
import Vuex from 'vuex';
// modules
import dogBreeds from './modules/dog-breeds';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    dogBreeds,
  },
});
