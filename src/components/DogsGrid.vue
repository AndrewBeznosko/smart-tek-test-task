<template>
  <div class="dogs-grid" :class="hasFirstMediaLarge && 'dogs-grid--first-media-large'">
    <MediaCard />
  </div>
</template>

<script>
export default {
  name: 'DogsGrid',
  props: {
    dogsList: {
      type: Array,
      default: () => [],
    },
    hasFirstMediaLarge: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
  .dogs-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px; // TODO: add rem

    &--first-media-large {
      &:first-child {
        // large style
      }
    }
  }
</style>
