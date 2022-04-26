import Axios from 'axios'
import { baseURL } from '../env'
export const api = Axios.create({
  baseURL,
  timeout: 8000
})

export const pokeApi = Axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon',
  timeout: 8000
})

export const sandboxApi = Axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/jerms/pokemon',
  timeout: 8000
})