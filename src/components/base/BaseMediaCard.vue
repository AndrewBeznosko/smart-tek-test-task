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
      v-if="img"
      :src="img"
      :alt="name"
      class="media-card__img"
    />
    <div class="media-card__name-block" v-text="name" />
  </div>
</template>

<script>
export default {
  name: 'MediaCard',
  props: {
    mediaId: [String, Number],
    img: String,
    name: String,
  },
};
</script>

<style lang="scss" scoped>
  .media-card {
    height: 290px;
    position: relative;
    background-color: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    z-index: 1;

    &__favorite-button {
      position: absolute; // TODO: add mixin to position property
      top: 20px;
      left: 20px;
      padding: 5px;
      cursor: pointer;
      filter: drop-shadow(0 0 10px rgba(0,0,0,.7));
      transition: .2s;

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
      font-size: 25px;
      line-height: 28px;
      letter-spacing: 0.01em;
      text-transform: capitalize;
      color: #ffffff;
      text-decoration: none;
      padding: 25px;
      box-sizing: border-box;
      background: linear-gradient(1.26deg, #000000 -5.53%, rgba(0, 0, 0, 0) 54.45%);
    }
  }
</style>
