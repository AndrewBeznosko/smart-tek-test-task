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
      <BaseInfiniteScroll
        v-if="isShowDogs"
        v-slot="{ items: dogsListByBreedLimited }"
        :items="dogsListByBreed"
        :limit-by="20"
      >
        <BaseMediaCardsGrid>
          <BaseMediaCard
            v-for="dog in dogsListByBreedLimited"
            :key="dog.img"
            :img="dog.img"
            :name="dog.name"
            :is-favorite="dog.isFavorite"
            @favorite="(favoriteState) => handleFavouriteStateChange({ dog, favoriteState })"
          />
        </BaseMediaCardsGrid>
      </BaseInfiniteScroll>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import DogBreedsControlPanel from '@/components/DogBreedsControlPanel.vue';
import ROUTE_NAMES from '@/constants/route-names.constants';
import BaseInfiniteScroll from '@/components/base/BaseInfiniteScroll.vue';
import BaseMediaCardsGrid from '@/components/base/BaseMediaCardsGrid.vue';
import BaseMediaCard from '@/components/base/BaseMediaCard.vue';
import BaseBadge from '@/components/base/BaseBadge.vue';

export default {
  name: 'DogBreedsItem',

  components: {
    BaseBadge,
    BaseMediaCard,
    BaseMediaCardsGrid,
    BaseInfiniteScroll,
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
      this.$router.push({ name: ROUTE_NAMES.Breeds });
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
