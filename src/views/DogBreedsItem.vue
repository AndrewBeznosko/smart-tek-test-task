<template>
  <div class="about">
    <DogBreedsControlPanel v-if="dogBreedsList.length">
      <template #left-controls>
        <BaseBadge
          :name="dogBreedInfo.name"
          icon="close"
          is-active
          @click.native="navigateToAllBreeds"
        />
      </template>
    </DogBreedsControlPanel>
    <MediaCardsGrid class="breeds-page__dogs-grid">
      <MediaCard
        v-for="breedImg in dogBreedImages"
        :key="breedImg"
        :img="breedImg"
        :name="dogBreedInfo.name"
        :is-favorite="dogBreedInfo.isFavorite"
        @favorite="(favoriteState) => handleFavoriteClick(favoriteState, breedImg)"
      />
    </MediaCardsGrid>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import DogBreedsControlPanel from '@/components/DogBreedsControlPanel.vue';
import { fetchDogBreedImages } from '@/api/dog-breeds/dog-breeds';
import ROUTE from '@/router/routeNames';

export default {
  name: 'DogBreedsItem',

  components: {
    DogBreedsControlPanel,
  },

  data: () => ({
    dogBreedImages: null,
  }),

  computed: {
    ...mapGetters('dogBreeds', ['getDogBreedByKey', 'dogBreedsList']),

    dogBreedInfo() {
      return this.getDogBreedByKey(this.$route.params?.breed);
    },
  },

  methods: {
    ...mapActions('dogBreeds', ['fetchDogBreedsList', 'handleFavouriteStateChange']),

    async fetchDogBreedImages() {
      const { breed, subBreed } = this.dogBreedInfo;

      this.dogBreedImages = await fetchDogBreedImages({
        breed,
        subBreed,
      });
    },

    navigateToAllBreeds() {
      this.$router.push({ name: ROUTE.Breeds });
    },

    handleFavoriteClick(favoriteState, breedImg) {
      this.handleFavouriteStateChange({
        dog: {
          ...this.dogBreedInfo,
          img: breedImg,
        },
        favoriteState,
      });
    },
  },

  async created() {
    await this.fetchDogBreedsList();
    await this.fetchDogBreedImages();
  },
};
</script>
