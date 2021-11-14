<template>
  <div class="control-panel">
    <div class="control-panel__row">
      <div class="control-panel__row-left">
        <button
          class="control-panel__breed-btn"
          type="button"
          @click="toggleBreedsListVisibility"
        >
          Породы
          <SvgIcon
            class="control-panel__breed-btn-icon"
            :class="{ 'control-panel__breed-btn-icon--opened': isBreedsListVisible }"
            name="arrow-down"
            width="9"
            height="5"
          />
        </button>
      </div>
      <div class="control-panel__row-right">
        <slot name="right-controls"/>
      </div>
    </div>
    <transition name="collapse">
      <div v-if="isBreedsListVisible" class="control-panel__breeds">
        <BaseBadge name="Все пёсели" is-active />
        <div class="control-panel__breeds-list">
          <template v-for="(group, key) in dogBreedsGroupedAlphabetically">
            <div
              :key="key"
              class="control-panel__breeds-alphabet-group-letter"
              v-text="key"
            />
            <BaseBadge
              v-for="breed in group"
              :key="breed"
              class="control-panel__breeds-alphabet-group-badge"
              :name="breed"
              @click.native="redirectToTheBreed(breed)"
            />
          </template>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getFirstSymbol } from '@/helpers';

export default {
  name: 'BreedsControlPanel',
  data: () => ({
    isBreedsListVisible: false,
  }),
  computed: {
    ...mapGetters('dogBreeds', ['dogBreedsList']),

    dogBreedsListNames() {
      return this.dogBreedsList.map(({ name }) => name);
    },
    dogBreedsGroupedAlphabetically() {
      return this.dogBreedsListNames.reduce((accumulator, breed) => {
        const group = getFirstSymbol(breed);

        return {
          ...accumulator,
          [group]: [...(accumulator[group] || []), breed],
        };
      }, {});
    },
  },
  methods: {
    toggleBreedsListVisibility() {
      this.isBreedsListVisible = !this.isBreedsListVisible;
    },
    redirectToTheBreed(breed) {
      this.$router.push({ name: 'BreedsItem', params: { breed } });
    },
  },
};
</script>

<style lang="scss" scoped>
  .control-panel {
    &__breed-btn {
      line-height: 2rem;
      color: var(--white);
      padding: 0.2rem 0;
      border-bottom: dashed 1px var(--white);
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    &__breed-btn-icon {
      transition: var(--animation-time);

      &--opened {
        transform: rotateX(180deg);
      }
    }

    &__breeds {
      padding-top: 3rem;
    }

    &__breeds-alphabet-group {
      display: inline-flex;
      gap: 1.5rem;
    }

    &__breeds-alphabet-group-letter {
      font-size: 2rem;
      line-height: 2.8rem;
      color: var(--light);

      &:not(:first-of-type) {
        margin-left: 2.5rem;
      }
    }

    &__breeds-alphabet-group-badge {
      text-transform: capitalize;
    }

    &__breeds-list {
      margin-top: 1.7rem;
      display: inline-flex;
      align-items: center;
      gap: 1.5rem;
      flex-wrap: wrap;
    }

    &__row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
