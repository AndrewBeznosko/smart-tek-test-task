<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import BaseLoader from '@/components/base/BaseLoader.vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  limitBy: [Number, String],
})

const emit = defineEmits<{
  intersect: [page: number]
}>()

const LOADING_DELAY = 1000

const observer = ref<IntersectionObserver | null>(null)
const loader = ref<HTMLInputElement | null>(null)
const page = ref<number>(1)

const itemsLimited = computed(() => {
  if (!props.items)
    return []
  if (!props.limitBy)
    return props.items

  return [...props.items].slice(0, page.value * Number(props.limitBy))
})

const isShowLoader = computed(() => {
  return props.items?.length && ((page.value * Number(props.limitBy)) < props.items.length)
})

onMounted(() => {
  observer.value = new IntersectionObserver(([entry]) => {
    if (entry && entry.isIntersecting) {
      if (!props.items)
        return

      // setTimeout only for server delay imitation
      setTimeout(() => {
        emit('intersect', page.value += 1)
      }, LOADING_DELAY)
    }
  })

  if ('observe' in observer.value)
    observer.value.observe(loader.value as HTMLInputElement)
})
</script>

<template>
  <div class="infinite-scroll">
    <slot :items="itemsLimited" />

    <div ref="loader" class="infinite-scroll__loader">
      <BaseLoader v-if="isShowLoader" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .infinite-scroll {
    &__loader {
      margin-top: 5rem;
    }
  }
</style>
