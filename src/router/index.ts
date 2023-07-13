import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import ROUTE from '@/constants/route-names.constants'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: ROUTE.Breeds,
    component: () => import('@/views/DogBreeds.vue'),
  },
  {
    path: '/favorites',
    name: ROUTE.BreedsFavorites,
    component: () => import('@/views/DogBreedsFavorites.vue'),
  },
  {
    path: '/:breed',
    name: ROUTE.BreedsItem,
    component: () => import('@/views/DogBreedsItem.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
