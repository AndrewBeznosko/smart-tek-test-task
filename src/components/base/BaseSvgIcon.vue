<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  width?: string | number
  height?: string | number
  name: string
}>()

const icon = computed(() => `#icon-${props.name}`)

const iconStyles = computed(() => ({
  width: props.width && `${props.width}px`,
  height: props.height && `${props.height}px`,
}))
</script>

<template>
  <svg :style="iconStyles">
    <use :href="icon" />
  </svg>
</template>
