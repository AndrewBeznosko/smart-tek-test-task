<template>
  <div class="breeds-page">
    <template v-if="dogBreedsList.length">
      <BreedsControlPanel>
        <template #right-controls>
          Сортировка по алфавиту
        </template>
      </BreedsControlPanel>
      <MediaCardsGrid class="breeds-page__dogs-grid">
        <DogsGridItem
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
import BreedsControlPanel from '@/components/BreedsControlPanel.vue';
import DogsGridItem from '@/components/DogsGridItem.vue';

export default {
  name: 'Home',
  components: {
    BreedsControlPanel,
    DogsGridItem,
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
