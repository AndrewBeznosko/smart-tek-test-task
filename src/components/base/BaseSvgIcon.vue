<template>
  <svg :style="iconStyles">
    <rect
      v-if="!iconReady"
      opacity=".2"
      width="100%"
      height="100%"
      rx="3"
    />
    <use
      v-if="iconReady"
      ref="icon"
      :href="icon"
    />
  </svg>
</template>

<script>
/* eslint-disable prefer-template */
export default {
  name: 'SvgIcon',
  props: {
    width: [String, Number],
    height: [String, Number],
    name: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      iconReady: false,
    };
  },
  computed: {
    icon() {
      return `#icon-${this.name}`;
    },
    iconStyles() {
      return {
        width: this.width && `${this.width}px`,
        height: this.height && `${this.height}px`,
      };
    },
  },

  watch: {
    name: {
      async handler(value) {
        await import(/* webpackChunkName: "[request]" */ '../../assets/svg-icons/' + value + '.svg'); // TODO: check if it need
        this.iconReady = true;
      },
      immediate: true,
    },
  },
};
</script>
