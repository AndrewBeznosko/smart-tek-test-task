<script setup lang="ts">
import { computed } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import ROUTE_NAMES from '@/constants/route-names.constants'
import BaseSvgIcon from '@/components/base/BaseSvgIcon.vue'

const breedsFavoritesRoute = computed<RouteLocationRaw>(() => ({ name: ROUTE_NAMES.BreedsFavorites }))
const breedsRoute = computed<RouteLocationRaw>(() => ({ name: ROUTE_NAMES.Breeds }))
</script>

<template>
  <nav class="app-nav">
    <div class="app-container app-nav__container">
      <router-link :to="breedsRoute">
        <img
          src="@/assets/logo.svg"
          alt="Pesel logo"
          class="app-nav__logo"
        >
      </router-link>
      <router-link
        class="app-nav__favourite-link"
        active-class="app-nav__favourite-link--active"
        :to="breedsFavoritesRoute"
      >
        Favorite dogs
        <BaseSvgIcon
          name="heart"
          width="16"
          height="14"
        />
      </router-link>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
  .app-nav {
    height: 5rem;
    position: sticky;
    top: 0;
    left: 0;
    background: var(--secondary);
    box-shadow: 0 0.8rem 1.6rem rgba(0, 0, 0, 0.55);
    margin-bottom: 3rem;
    z-index: 99;

    @include tablet-and-more {
      height: 10rem;
      margin-bottom: 5rem;
    }

    &__container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
    }

    &__logo {
      height: 2rem;

      @include tablet-and-more {
        height: initial;
      }
    }

    &__favourite-link {
      display: flex;
      align-items: center;
      color: var(--light);
      line-height: 2.8rem;
      gap: 1rem;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }

      &--active {
        color: var(--white);
        pointer-events: none;
      }
    }
  }
</style>
