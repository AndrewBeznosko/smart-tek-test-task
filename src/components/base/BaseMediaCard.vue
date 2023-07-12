<script setup>
import { computed, ref } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import BaseSvgIcon from '@/components/base/BaseSvgIcon.vue'

const props = defineProps<{
  isFavorite: boolean
  lgSize?: boolean
  navigateTo?: string | RouteLocationRaw
  img: string
  name: string
}>()

const emit = defineEmits<{
  favorite: [isFavorite: boolean]
}>()

const isImgLoaded = ref(false)
const isFavoriteIcon = computed(() => props.isFavorite ? 'heart-fill' : 'heart')
const onImgLoad = () => isImgLoaded.value = true
</script>

<template>
  <div
    class="media-card"
    :class="{ 'media-card--lg': lgSize }"
  >
    <button
      class="media-card__favorite-button"
      @click="emit('favorite', !isFavorite)"
    >
      <BaseSvgIcon
        class="media-card__favorite-icon"
        :name="isFavoriteIcon"
        width="29"
        height="26"
      />
    </button>
    <transition name="fade">
      <img
        v-if="img"
        v-show="isImgLoaded"
        :src="img"
        :alt="name"
        class="media-card__img"
        @load="onImgLoad"
      >
    </transition>
    <div class="media-card__name-block">
      <router-link
        v-if="Boolean(navigateTo)"
        :to="navigateTo"
        class="media-card__name-link"
        v-text="name"
      />
      <template v-else>
        {{ name }}
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .media-card {
    height: 24rem;
    position: relative;
    border-radius: 0.8rem;
    overflow: hidden;
    z-index: 1;
    $this: &;

    @include tablet-and-more {
      height: 29rem;
    }

    &__favorite-button {
      position: absolute;
      top: 1rem;
      left: 1rem;
      padding: 0.5rem;
      cursor: pointer;
      filter: drop-shadow(0 0 1rem rgba(0,0,0,.7));
      transition: var(--animation-time);

      &:hover {
        transform: scale(1.2);
      }

      @include tablet-and-more {
        top: 2rem;
        left: 2rem;
      }
    }

    &__favorite-icon {
      fill: var(--white);
      color: var(--white);
    }

    &__img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: -1;
    }

    &__name-block {
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      width: 100%;
      height: 100%;
      font-weight: 600;
      font-size: 2rem;
      line-height: 2.4rem;
      letter-spacing: 0.01em;
      text-transform: capitalize;
      color: var(--white);
      text-decoration: none;
      padding: 2rem;
      box-sizing: border-box;
      background: linear-gradient(1.26deg, var(--black) -5.53%, rgba(0, 0, 0, 0) 54.45%);

      @include tablet-and-more {
        font-size: 2.5rem;
        line-height: 2.8rem;
        padding: 2.5rem;
      }
    }

    &__name-link {
      width: 100%;
      padding-top: 4rem;
      text-align: right;
      cursor: pointer;
      color: inherit;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    &--lg {
      height: 30rem;

      @include tablet-and-more {
        height: 51.3rem;
      }

      #{$this}__name-block {
        font-size: 2.5rem;
        line-height: 2.8rem;
        padding: 2.5rem;

        @include tablet-and-more {
          font-size: 3rem;
          line-height: 2.8rem;
          padding: 5rem;
        }
      }

      #{$this}__favorite-button {
        top: 2rem;
        left: 2rem;

        @include tablet-and-more {
          top: 3rem;
          left: 3rem;
        }
      }
    }
  }
</style>
