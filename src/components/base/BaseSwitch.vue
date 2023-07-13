<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  value: boolean | number
  checked?: boolean
}>()

const emit = defineEmits<{
  input: [willBeChecked: boolean]
  change: [willBeChecked: boolean]
}>()

const isChecked = computed(() => props.checked || props.value)

function onChangeInput(willBeChecked: boolean): void {
  emit('input', willBeChecked)

  emit('change', willBeChecked)
}
</script>

<template>
  <label class="switch" :class="{ 'switch--checked': isChecked }">
    <slot name="label-before" />
    <input
      class="switch__input"
      type="checkbox"
      :checked="isChecked"
      :value="isChecked"
      @change="onChangeInput($event.target.checked)"
      @keydown.enter="onChangeInput($event.target.checked)"
    >
    <span class="switch__toggle" />
    <slot name="label-after" />
  </label>
</template>

<style lang="scss" scoped>
  .switch {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    color: var(--light);
    cursor: pointer;

    &--checked {
      color: var(--white);
    }

    &:hover {
      text-decoration: underline;
    }

    &__input {
      height: 0;
      width: 0;
      visibility: hidden;
    }

    &__toggle {
      cursor: pointer;
      text-indent: -9999px;
      width: 3.2rem;
      height: 1.6rem;
      display: block;
      border-radius: 0.8rem;
      position: relative;
      border: 1px solid var(--light);

      &:after {
        content: '';
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0.3rem;
        width: 1rem;
        height: 1rem;
        background-color: var(--light);
        border-radius: 10rem;
        transition: var(--animation-time);
      }

      &:active:after {
        width: 1.5rem;
      }
    }
  }

  input:checked + .switch__toggle {
    background: var(--white);
    border-color: var(--primary);

    &:after {
      left: calc(100% - 0.3rem);
      transform: translate(-100%, -50%);
      background-color: var(--primary);
    }
  }
</style>
