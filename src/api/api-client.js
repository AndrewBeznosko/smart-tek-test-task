import axios from 'axios';

export const initClientInstance = () => axios.create({
  baseURL: 'https://dog.ceo/api',
});

export const apiClient = initClientInstance();
