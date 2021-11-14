<template>
  <div class="breeds-page">
    <template v-if="dogBreedsList.length">
      <DogBreedsControlPanel>
        <template #right-controls>
          Сортировка по алфавиту
        </template>
      </DogBreedsControlPanel>
      <MediaCardsGrid class="breeds-page__dogs-grid">
        <DogBreedsCard
          v-for="breed in dogBreedsList"
          :key="breed.name"
          :breed="breed"
        />
      </MediaCardsGrid>
    </template>
    <h2 v-if="!dogBreedsList.length">
      The dog breeds list is empty
    </h2>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import DogBreedsControlPanel from '@/components/DogBreedsControlPanel.vue';
import DogBreedsCard from '@/components/DogBreedsCard.vue';

export default {
  name: 'Home',
  components: {
    DogBreedsControlPanel,
    DogBreedsCard,
  },
  computed: {
    ...mapGetters('dogBreeds', ['dogBreedsList']),
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
