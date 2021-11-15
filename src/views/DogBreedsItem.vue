<template>
  <div>
    <template v-if="isShowDogs">
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
      <InfiniteScroll
        v-slot="{ items: dogBreedImagesLimited }"
        :items="dogBreedImages"
        :limit-by="20"
      >
        <MediaCardsGrid class="breeds-page__dogs-grid">
          <MediaCard
            v-for="breedImg in dogBreedImagesLimited"
            :key="breedImg"
            :img="breedImg"
            :name="dogBreedInfo.name"
            :is-favorite="dogBreedInfo.isFavorite"
            @favorite="(favoriteState) => handleFavoriteClick(favoriteState, breedImg)"
          />
        </MediaCardsGrid>
      </InfiniteScroll>
    </template>
    <h2 v-if="!isShowDogs">
      There is no such dog breed
    </h2>
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
      return this.getDogBreedByKey(this.$route.params?.breed) || {};
    },

    isShowDogs() {
      return this.dogBreedInfo?.key;
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
