import { apiClient } from '@/api/api-client';
import DOG_BREEDS_RESOURCE from '@/api/dog-breeds/dog-breeds.resource';

export const fetchDogBreedsList = async () => {
  const { data } = await apiClient.get(DOG_BREEDS_RESOURCE.BreedsListAll);

  return data?.message;
};

export const fetchDogBreedImages = async ({ breed, subBreed, imagesCount }) => {
  const urlPath = [
    DOG_BREEDS_RESOURCE.Breed,
    breed,
    subBreed,
    DOG_BREEDS_RESOURCE.ImagesRandom,
    imagesCount,
  ].filter(Boolean).join('/');
  const { data } = await apiClient.get(urlPath);

  return data?.message;
};
