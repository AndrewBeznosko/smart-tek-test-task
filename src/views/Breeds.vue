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
    <div v-if="!dogBreedsList.length" class="dogs-grid__empty-list">
      The dog breeds list is empty
    </div>
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
