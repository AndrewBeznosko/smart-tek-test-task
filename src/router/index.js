import Vue from 'vue';
import VueRouter from 'vue-router';
import ROUTE from '@/router/routeNames';

const Breeds = () => import(/* webpackChunkName: "breeds" */ '@/views/Breeds.vue');
const BreedsFavourites = () => import(/* webpackChunkName: "breeds-favourites" */ '@/views/BreedsFavourites.vue');
const BreedsItem = () => import(/* webpackChunkName: "breeds-item" */ '@/views/BreedsItem.vue');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: ROUTE.Breeds,
    component: Breeds,
  },
  {
    path: '/favourites',
    name: ROUTE.BreedsFavourites,
    component: BreedsFavourites,
  },
  {
    path: '/:breed',
    name: ROUTE.BreedsItem,
    component: BreedsItem,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
