<template>
  <div class="dogs-grid" :class="hasFirstMediaLarge && 'dogs-grid--first-media-large'">
    <template v-if="dogsList.length">
      <DogsGridItem
        v-for="breed in dogsList"
        :key="breedKey(breed)"
        :breed="breed"
      />
    </template>
    <div v-if="!dogsList.length" class="dogs-grid__empty-list">
      The dogs list is empty
    </div>
  </div>
</template>

<script>
import DogsGridItem from '@/components/DogsGridItem.vue';
import { isNotEmptyArray } from '@/helpers';

export default {
  name: 'DogsGrid',
  components: { DogsGridItem },
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
  computed: {
    breedKey() {
      return (breed) => (isNotEmptyArray(breed) ? breed.join('/') : breed);
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
