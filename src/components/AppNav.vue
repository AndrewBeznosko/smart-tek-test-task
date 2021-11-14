<template>
  <nav class="app-nav">
    <div class="app-container app-nav__container">
      <a class="app-nav__logo-link" href="/">
        <img
          class="app-nav__logo-img"
          src="@/assets/logo.svg"
          alt="Pesel logo"
        />
      </a>
      <div class="app-nav__actions">
        <!-- TODO: fix route name view -->
        <router-link :to="{ name: 'Breed' }">
          Избранные пёсели
          <SvgIcon
            name="heart"
            width="16"
            height="14"
          />
          <!-- TODO: add <SvgIcon> component -->
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppNav',
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
    z-index: 99;

    &__container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
    }

    &__logo-link {

    }

    &__logo-img {

    }

    &__actions {

    }
  }
</style>
