<template>
  <div v-if="dogBreedsList.length">
    <DogBreedsControlPanel :active-dog-breed="dogBreedInfo">
      <template #left-controls>
        <BaseBadge
          :name="dogBreedInfo.name"
          icon="close"
          is-active
          @click.native="navigateToAllBreeds"
        />
      </template>
    </DogBreedsControlPanel>
    <transition name="fade">
      <InfiniteScroll
        v-if="isShowDogs"
        v-slot="{ items: dogsListByBreedLimited }"
        :items="dogsListByBreed"
        :limit-by="20"
      >
        <MediaCardsGrid>
          <MediaCard
            v-for="dog in dogsListByBreedLimited"
            :key="dog.img"
            :img="dog.img"
            :name="dog.name"
            :is-favorite="dog.isFavorite"
            @favorite="(favoriteState) => handleFavouriteStateChange({ dog, favoriteState })"
          />
        </MediaCardsGrid>
      </InfiniteScroll>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import DogBreedsControlPanel from '@/components/DogBreedsControlPanel.vue';
import ROUTE from '@/constants/route-names.constants';

export default {
  name: 'DogBreedsItem',

  components: {
    DogBreedsControlPanel,
  },

  computed: {
    ...mapGetters('dogBreeds', [
      'getDogBreedByKey',
      'dogBreedsList',
      'dogsListByBreed',
    ]),

    dogBreedKey() {
      return this.$route.params?.breed;
    },

    dogBreedInfo() {
      return this.getDogBreedByKey(this.dogBreedKey) || {};
    },

    isShowDogs() {
      return Boolean(this.dogsListByBreed.length);
    },
  },

  watch: {
    $route: {
      handler() {
        this.fetchDogBreedImages(this.dogBreedKey);
      },
    },
  },

  methods: {
    ...mapActions('dogBreeds', [
      'fetchDogBreedsList',
      'handleFavouriteStateChange',
      'fetchDogBreedImages',
    ]),

    navigateToAllBreeds() {
      this.$router.push({ name: ROUTE.Breeds });
    },
  },

  async created() {
    await this.fetchDogBreedsList();

    if (this.dogBreedsList.length) {
      await this.fetchDogBreedImages(this.dogBreedKey);
    }
  },
};
</script>
