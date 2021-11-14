<template>
  <div class="control-panel">
    <div class="control-panel__row">
      <button class="control-panel__breed-btn" type="button">
        Породы
        <SvgIcon
          name="arrow-down"
          width="9"
          height="5"
        />
      </button>
    </div>
    <div class="control-panel__breeds">
      <BaseBadge name="Все пёсели" is-active />
      <div class="control-panel__breeds-list">
        <template v-for="(group, key) in breedsGroupedAlphabetically">
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
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { isNotEmptyArray } from '@/helpers';

const getFirstSymb = (str) => str.charAt(0).toUpperCase();

export default {
  name: 'BreedsControlPanel',
  computed: {
    ...mapGetters('dogs', ['dogsList']),
    dogsListOnlyStrings() {
      return this.dogsList.map((breed) => (isNotEmptyArray(breed)
        ? breed.join(' ')
        : breed));
    },
    breedsGroupedAlphabetically() {
      return this.dogsListOnlyStrings.reduce((accumulator, breed) => {
        const group = getFirstSymb(breed);

        return {
          ...accumulator,
          [group]: [...(accumulator[group] || []), breed],
        };
      }, {});
    },
  },
};
</script>

<style lang="scss" scoped>
  .control-panel {
    &__breed-btn {
      color: #ffffff;
      padding: 2px 0;
      border-bottom: dashed 1px #ffffff;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    &__breeds {
      padding-top: 30px;
    }

    &__breeds-alphabet-group {
      display: inline-flex;
      gap: 15px;
    }

    &__breeds-alphabet-group-letter {
      font-size: 20px;
      line-height: 28px;
      color: #626262;

      &:not(:first-of-type) {
        margin-left: 25px;
      }
    }

    &__breeds-alphabet-group-badge {
      text-transform: capitalize;
    }

    &__breeds-list {
      margin-top: 17px;
      display: inline-flex;
      align-items: center;
      gap: 15px;
      flex-wrap: wrap;
    }
  }
</style>
