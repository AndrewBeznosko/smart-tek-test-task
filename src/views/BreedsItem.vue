<template>
  <div class="about">
    <BreedsControlPanel>
      <template #left-controls>
        <BaseBadge
          :name="dogBreedInfo.name"
          icon="close"
          is-active
        />
      </template>
    </BreedsControlPanel>
    <MediaCardsGrid class="breeds-page__dogs-grid">
      <MediaCard
        v-for="breedImg in dogBreedImages"
        :key="breedImg"
        :img="breedImg"
        :name="dogBreedInfo.name"
      />
    </MediaCardsGrid>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BreedsControlPanel from '@/components/BreedsControlPanel.vue';
import { fetchDogBreedImages } from '@/api/dog-breeds/dog-breeds';

export default {
  name: 'BreedsItem',

  components: {
    BreedsControlPanel,
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
    ...mapActions('dogBreeds', ['fetchDogBreedsList']),

    async fetchDogBreedImages() {
      const { breed, subBreed } = this.dogBreedInfo;

      this.dogBreedImages = await fetchDogBreedImages({
        breed,
        subBreed,
      });
    },
  },

  mounted() {
    console.log(this.$route.params?.breed);
  },

  async created() {
    await this.fetchDogBreedsList();
    await this.fetchDogBreedImages();
  },
};
</script>
