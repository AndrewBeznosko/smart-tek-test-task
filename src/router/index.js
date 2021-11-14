import Vue from 'vue';
import VueRouter from 'vue-router';
import ROUTE from '@/router/routeNames';

const Breeds = () => import(/* webpackChunkName: "breeds" */ '@/views/Breeds.vue');
const BreedsFavorites = () => import(/* webpackChunkName: "breeds-favorites" */ '@/views/BreedsFavorites.vue');
const BreedsItem = () => import(/* webpackChunkName: "breeds-item" */ '@/views/BreedsItem.vue');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: ROUTE.Breeds,
    component: Breeds,
  },
  {
    path: '/favorites',
    name: ROUTE.BreedsFavorites,
    component: BreedsFavorites,
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
