<template>
  <div class="media-card">
    <button class="media-card__favorite-button">
      <SvgIcon
        name="heart"
        width="29"
        height="26"
      />
    </button>
    <img
      :src="imgUrl"
      alt=""
      class="media-card__img"
    />
    <span class="media-card__name" v-text="name"/>
  </div>
</template>

<script>
export default {
  name: 'MediaCard',
  props: {
    id: [String, Number],
    imgUrl: String,
    name: String,
  },
};
</script>

<style lang="scss" scoped>
  .media-card {
    position: relative;
    background: linear-gradient(1.26deg, #000000 -5.53%, rgba(0, 0, 0, 0) 54.45%);
    border-radius: 8px;
    z-index: 1;

    &__favorite-button {
      position: absolute; // TODO: add mixin to position property
      top: 25px;
      left: 25px;
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
  }
</style>