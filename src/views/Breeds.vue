<template>
  <div class="breeds-page">
    <template v-if="dogBreedsList.length">
      <DogBreedsControlPanel>
        <template #right-controls>
<!--          TODO: add switch style -->
          <label>
            Сортировка по алфавиту
            <input v-model="sortByAlphabet" type="checkbox">
          </label>
        </template>
      </DogBreedsControlPanel>
      <transition-group
        name="cell"
        tag="MediaCardsGrid"
        class="breeds-page__dogs-grid"
      >
        <DogBreedsCard
          v-for="dog in dogList"
          :key="dog.key"
          class="cell"
          :dog="dog"
        />
      </transition-group>

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
  name: 'Home',
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

<style lang="scss" scoped>
  .breeds-page {
    &__dogs-grid {
      padding-bottom: 5rem;
    }
  }
</style>
