import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import ROUTE_NAMES from '@/constants/route-names.constants'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: ROUTE_NAMES.Breeds,
    component: () => import('@/views/DogBreeds.vue'),
  },
  {
    path: '/favorites',
    name: ROUTE_NAMES.BreedsFavorites,
    component: () => import('@/views/DogBreedsFavorites.vue'),
  },
  {
    path: '/:breed',
    name: ROUTE_NAMES.BreedsItem,
    component: () => import('@/views/DogBreedsItem.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
