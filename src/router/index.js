import {createRouter, createWebHistory} from 'vue-router';
import ROUTE from '@/constants/route-names.constants';

const DogBreeds = () => import(/* webpackChunkName: "breeds" */ '@/views/DogBreeds.vue');
const DogBreedsFavorites = () => import(/* webpackChunkName: "breeds-favorites" */ '@/views/DogBreedsFavorites.vue');
const DogBreedsItem = () => import(/* webpackChunkName: "breeds-item" */ '@/views/DogBreedsItem.vue');

const routes = [
  {
    path: '/',
    name: ROUTE.Breeds,
    component: DogBreeds,
  },
  {
    path: '/favorites',
    name: ROUTE.BreedsFavorites,
    component: DogBreedsFavorites,
  },
  {
    path: '/:breed',
    name: ROUTE.BreedsItem,
    component: DogBreedsItem,
  },
];

const router = createRouter({
  history: createWebHistory(),
  base: import.meta.env.BASE_URL,
  routes,
});

export default router;
