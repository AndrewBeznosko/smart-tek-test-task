<template>
  <div class="breeds">
    <template v-if="dogBreedsList.length">
      <DogBreedsControlPanel>
        <template #right-controls>
          <BaseSwitch v-model="sortByAlphabet">
            <template #label-before>
              <span>
                <span class="breeds__sort-word">Сортировка</span>
                по алфавиту
              </span>
            </template>
          </BaseSwitch>
        </template>
      </DogBreedsControlPanel>
      <BaseInfiniteScroll
        v-slot="{ items: dogListLimited }"
        :items="dogList"
        :limit-by="20"
      >
        <BaseMediaCardsGrid has-first-media-large>
          <DogBreedsCard
            v-for="(dog, index) in dogListLimited"
            :key="dog.key"
            class="cell"
            :dog="dog"
            :lg-size="index === 0"
          />
        </BaseMediaCardsGrid>
      </BaseInfiniteScroll>
    </template>
    <h2 v-if="!dogBreedsList.length">
      The dog breeds list is empty
    </h2>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import {shuffle} from 'lodash-es';
import DogBreedsControlPanel from '@/components/DogBreedsControlPanel.vue';
import DogBreedsCard from '@/components/DogBreedsCard.vue';
import BaseSwitch from '@/components/base/BaseSwitch.vue';
import BaseInfiniteScroll from '@/components/base/BaseInfiniteScroll.vue';
import BaseMediaCardsGrid from '@/components/base/BaseMediaCardsGrid.vue';

export default {
  name: 'DogBreeds',

  components: {
    BaseMediaCardsGrid,
    BaseInfiniteScroll,
    BaseSwitch,
    DogBreedsControlPanel,
    DogBreedsCard,
  },

  data: () => ({
    sortByAlphabet: false,
  }),

  computed: {
    ...mapGetters('dogBreeds', ['dogBreedsList']),

    dogList() {
      return this.sortByAlphabet ? this.dogBreedsList : shuffle(this.dogBreedsList);
    },
  },

  methods: {
    ...mapActions('dogBreeds', ['fetchDogBreedsList']),
  },

  created() {
    this.fetchDogBreedsList();
  },
};
</script>

<style lang="scss" scoped>
  .breeds {
    &__sort-word {
      display: none;

      @include tablet-and-more {
        display: inline;
      }
    }
  }
</style>
