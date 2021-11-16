<template>
  <nav class="app-nav">
    <div class="app-container app-nav__container">
      <router-link :to="breedsRoute">
        <img src="@/assets/logo.svg" alt="Pesel logo" />
      </router-link>
      <router-link
        class="app-nav__favourite-link"
        active-class="app-nav__favourite-link--active"
        :to="breedsFavoritesRoute"
      >
        Избранные пёсели
        <SvgIcon
          name="heart"
          width="16"
          height="14"
        />
      </router-link>
    </div>
  </nav>
</template>

<script>
import ROUTE from '@/constants/route-names.constants';

export default {
  name: 'AppNav',
  computed: {
    breedsFavoritesRoute() {
      return { name: ROUTE.BreedsFavorites };
    },
    breedsRoute() {
      return { name: ROUTE.Breeds };
    },
  },
};
</script>

<style lang="scss" scoped>
  .app-nav {
    height: 10rem;
    position: sticky;
    top: 0;
    left: 0;
    background: #151419;
    box-shadow: 0 0.8rem 1.6rem rgba(0, 0, 0, 0.55);
    margin-bottom: 5rem;
    z-index: 99;

    &__container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
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
      }
    }
  }
</style>
