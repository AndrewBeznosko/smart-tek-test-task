<template>
  <div class="loader">
    <div
      v-for="n in 3"
      :key="n"
      class="loader__circle"
    />
  </div>
</template>

<script>
export default {
  name: 'BaseLoader',
};
</script>

<style lang="scss" scoped>
  $animation-time: 1s;

  .loader {
    padding: 2rem;
    display: inline-flex;
    gap: 1.5rem;

    &__circle {
      width: 1.2rem;
      height: 1.2rem;
      border: 1px solid var(--white);
      border-radius: 10rem;

      @for $i from 1 through 3 {
        &:nth-child( #{$i} ) {
          animation: scaleChange $animation-time ease-in-out calc(var(--animation-time) * #{$i}) infinite;
        }
      }
    }
  }

  @keyframes scaleChange {
    0%, 75%, 100% {
      transform: scale(1);
    }

    25% {
      transform: scale(1.33);
    }
  }
</style>
