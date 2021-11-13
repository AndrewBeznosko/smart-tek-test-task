import { apiClient } from '@/api/api-client';

export const fetchDogsList = async () => {
  const { data } = await apiClient.get('breeds/list/all');
  return data?.message;
};

export const fetchDogImage = async ({ breed }) => {
  const { data } = await apiClient.get(`breed/${breed}/images/random`);
  return data?.message;
};
