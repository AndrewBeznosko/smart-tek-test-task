import { apiClient } from '@/api/api-client'
import DOG_BREEDS_RESOURCE from '@/api/dog-breeds/dog-breeds.resource'

export async function fetchDogBreedsList() {
  const { data } = await apiClient.get(DOG_BREEDS_RESOURCE.BreedsListAll)

  return data?.message
}

export async function fetchDogBreedImages({
  breed, subBreed, isRandom = false,
}) {
  const urlPath = [
    DOG_BREEDS_RESOURCE.Breed,
    breed,
    subBreed,
    DOG_BREEDS_RESOURCE.Images,
    isRandom && DOG_BREEDS_RESOURCE.Random,
  ].filter(Boolean).join('/')
  const { data } = await apiClient.get(urlPath)

  return data?.message
}
