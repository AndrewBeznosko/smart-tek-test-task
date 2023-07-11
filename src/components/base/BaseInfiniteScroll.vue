<template>
  <div class="infinite-scroll">
    <slot :items="itemsLimited" />

    <div ref="Loader" class="infinite-scroll__loader">
      <BaseLoader v-if="isShowLoader" />
    </div>
  </div>
</template>

<script>
import BaseLoader from '@/components/base/BaseLoader.vue';

const LOADING_DELAY = 1000;

export default {
  name: 'BaseInfiniteScroll',
  components: {BaseLoader},

  props: {
    items: {
      type: Array,
      default: () => [],
    },
    limitBy: [Number, String],
  },

  data: () => ({
    observer: null,
    page: 1,
  }),

  computed: {
    itemsLimited() {
      if (!this.items) return [];
      if (!this.limitBy) return this.items;

      return [...this.items].slice(0, this.page * this.limitBy);
    },

    isShowLoader() {
      return this.items?.length && ((this.page * this.limitBy) < this.items.length);
    },
  },

  mounted() {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        if (!this.items) return;

        // setTimeout only for server delay imitation
        setTimeout(() => {
          this.$emit('intersect', this.page += 1);
        }, LOADING_DELAY);
      }
    });

    this.observer.observe(this.$refs.Loader);
  },
};
</script>

<style lang="scss" scoped>
  .infinite-scroll {
    &__loader {
      margin-top: 5rem;
    }
  }
</style>
