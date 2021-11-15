<template>
  <div>
    <slot v-bind="{ items: itemsLimited }" />

    <div ref="Loader">
      <Loader v-if="isShowLoader" />
    </div>
  </div>
</template>

<script>
const LOADING_DELAY = 1000;

export default {
  name: 'InfiniteScroll',

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
      if (!this.limitBy) return this.items;

      return [...this.items].slice(0, this.page * this.limitBy);
    },

    isShowLoader() {
      return this.items.length && ((this.page * this.limitBy) < this.items.length);
    },
  },

  mounted() {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
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
