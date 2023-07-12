import axios from 'axios'

export function initClientInstance() {
  return axios.create({
    baseURL: 'https://dog.ceo/api',
  })
}

export const apiClient = initClientInstance()
