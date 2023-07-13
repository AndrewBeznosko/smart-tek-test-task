import { apiClient } from '@/api/api-client'
import DOG_BREEDS_RESOURCE from '@/api/dog-breeds/dog-breeds.resource'

interface DogBreedImagesParams {
  breed: string
  subBreed?: string
  isRandom?: boolean
}

export interface DogBreedsList {
  [breed: string]: string[]
}

export async function fetchDogBreedsList(): Promise<DogBreedsList> {
  const { data } = await apiClient.get(DOG_BREEDS_RESOURCE.BreedsListAll)

  return data?.message
}

/**
 *
 * @param breed - Dog breed name
 * @param subBreed - Dog Second Breed name
 * @param isRandom
 */
export async function fetchDogImages({
  breed,
  subBreed,
  isRandom = false,
}: DogBreedImagesParams): Promise<string | string[]> {
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

export async function fetchDogRandomImage(breed: string, subBreed?: string): Promise<string> {
  const res = await fetchDogImages({
    breed,
    subBreed,
    isRandom: true,
  })

  return res as string
}
