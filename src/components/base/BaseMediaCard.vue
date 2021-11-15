<template>
  <div class="media-card">
    <button
      class="media-card__favorite-button"
      @click="$emit('favorite', !isFavorite)"
    >
      <SvgIcon
        :name="isFavoriteIcon"
        width="29"
        height="26"
      />
    </button>
    <img
      v-if="img"
      :src="img"
      :alt="name"
      class="media-card__img"
    />
    <div class="media-card__name-block">
      <router-link
        v-if="Boolean(navigateTo)"
        :to="navigateTo"
        class="media-card__name-link"
        v-text="name"
      />
      <template v-else>{{ name }}</template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MediaCard',

  props: {
    isFavorite: {
      type: Boolean,
      default: false,
    },
    navigateTo: [Object, String],
    img: String,
    name: String,
  },

  computed: {
    isFavoriteIcon() {
      return this.isFavorite ? 'heart-fill' : 'heart';
    },
  },
};
</script>

<style lang="scss" scoped>
  .media-card {
    height: 29rem;
    position: relative;
    background-color: var(--white);
    border-radius: 0.8rem;
    overflow: hidden;
    z-index: 1;

    &__favorite-button {
      position: absolute; // TODO: add mixin to position property
      top: 2rem;
      left: 2rem;
      padding: 0.5rem;
      cursor: pointer;
      filter: drop-shadow(0 0 1rem rgba(0,0,0,.7));
      transition: var(--animation-time);

      &:hover {
        transform: scale(1.2);
      }
    }

    &__img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: -1;
    }

    &__name-block {
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      width: 100%;
      height: 100%;
      font-weight: 600;
      font-size: 2.5rem;
      line-height: 2.8rem;
      letter-spacing: 0.01em;
      text-transform: capitalize;
      color: var(--white);
      text-decoration: none;
      padding: 2.5rem;
      box-sizing: border-box;
      background: linear-gradient(1.26deg, var(--black) -5.53%, rgba(0, 0, 0, 0) 54.45%);
    }

    &__name-link {
      width: 100%;
      padding-top: 4rem;
      text-align: right;
      cursor: pointer;
      color: inherit;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
