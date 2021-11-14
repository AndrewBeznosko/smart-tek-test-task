<template>
  <component
    :is="tag"
    type="button"
    class="badge"
    :class="{ 'badge--active': isActive }"
  >
    {{ name }}
  </component>
</template>

<script>
export default {
  name: 'BaseBadge',
  props: {
    name: String,
    tag: {
      type: String,
      default: 'button',
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
  .badge {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 12px;
    border: 1px solid #626262;
    border-radius: 20px;
    font-size: 12px;
    line-height: 16px;
    color: #626262;

    &--active {
      color: #3C59F0;
      border-color: #3C59F0;
    }
  }
</style>
