<template>
  <svg :style="iconStyles">
    <use
      ref="icon"
      :href="icon"
    />
  </svg>
</template>

<script>
/* eslint-disable prefer-template */

export default {
  name: 'BaseSvgIcon',

  props: {
    width: [String, Number],
    height: [String, Number],
    name: {
      type: String,
      require: true,
    },
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
};
</script>
