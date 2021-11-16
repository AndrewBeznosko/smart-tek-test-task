<template>
  <div
    class="media-cards-grid"
    :class="{ 'media-cards-grid--first-card-large': hasFirstMediaLarge }"
  >
    <template v-if="!isEmpty"></template>
    <slot />
    <div v-if="isEmpty" class="media-cards-grid__empty-list">
      The list is empty
    </div>
  </div>
</template>

<script>
export default {
  name: 'MediaCardsGrid',

  props: {
    hasFirstMediaLarge: {
      type: Boolean,
      default: false,
    },
    isEmpty: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
  .media-cards-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;

    @include tablet-and-more {
      grid-template-columns: repeat(3, 1fr);
      gap: 3rem;
    }

    &--first-card-large {
      &>:first-child {
        grid-column-start: 1;
        grid-column-end: 3;

        @include tablet-and-more {
          grid-column-end: 4;
        }
      }
    }
  }
</style>
