<template>
  <div class="breeds-page">
    <template v-if="dogBreedsList.length">
      <DogBreedsControlPanel>
        <template #right-controls>
          <BaseSwitch v-model="sortByAlphabet">
            <template #label-before>
              Сортировка по алфавиту
            </template>
          </BaseSwitch>
        </template>
      </DogBreedsControlPanel>
      <InfiniteScroll
        v-slot="{ items: dogListLimited }"
        :items="dogList"
        :limit-by="20"
      >
        <MediaCardsGrid class="breeds-page__dogs-grid" has-first-media-large>
          <DogBreedsCard
            v-for="(dog, index) in dogListLimited"
            :key="dog.key"
            class="cell"
            :dog="dog"
            :lg-size="index === 0"
          />
        </MediaCardsGrid>
      </InfiniteScroll>
    </template>
    <h2 v-if="!dogBreedsList.length">
      The dog breeds list is empty
    </h2>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import shuffle from 'lodash.shuffle';
import DogBreedsControlPanel from '@/components/DogBreedsControlPanel.vue';
import DogBreedsCard from '@/components/DogBreedsCard.vue';

export default {
  name: 'DogBreeds',

  components: {
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
