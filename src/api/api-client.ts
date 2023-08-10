import type { AxiosInstance } from 'axios'
import axios from 'axios'

export function initClientInstance(): AxiosInstance {
  return axios.create({
    baseURL: 'https://dog.ceo/api',
  })
}

export const apiClient = initClientInstance()