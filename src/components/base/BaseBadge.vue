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
    gap: 0.8rem;
    padding: 0.4rem 1.2rem;
    border: 1px solid var(--light);
    border-radius: 2rem;
    font-size: 1.2rem;
    line-height: 1.6rem;
    color: var(--light);

    &--active {
      color: var(--primary);
      border-color: var(--primary);
    }
  }
</style>
