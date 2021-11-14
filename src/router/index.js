import Vue from 'vue';
import VueRouter from 'vue-router';
import Breeds from '@/views/Breeds.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Breeds',
    component: Breeds,
  },
  {
    path: '/:breed',
    name: 'BreedsItem',
    component: () => import(/* webpackChunkName: "breeds-item" */ '@/views/BreedsItem.vue'),
  },
  {
    path: '/favourites',
    name: 'BreedsFavourites',
    component: () => import(/* webpackChunkName: "breeds-favourites" */ '@/views/BreedsFavourites.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
