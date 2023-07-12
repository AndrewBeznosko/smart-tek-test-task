<template>
  <component
    :is="tag"
    type="button"
    class="badge"
    :class="{ 'badge--active': isActive }"
  >
    {{ name }}
    <BaseSvgIcon
      v-if="icon"
      :name="icon"
      width="6"
      height="6"
    />
  </component>
</template>

<script>
import BaseSvgIcon from '@/components/base/BaseSvgIcon.vue';

export default {
  name: 'BaseBadge',
  components: {BaseSvgIcon},

  props: {
    name: String,
    icon: String,
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
    fill: var(--light);

    &:hover{
      color: var(--white);
      border-color: var(--white);
      fill: var(--white);
    }

    &--active {
      color: var(--primary);
      border-color: var(--primary);
      fill: var(--primary);
    }
  }
</style>
