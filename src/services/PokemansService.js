import { AppState } from "../AppState"
import { Pokeman } from "../Models/Pokeman"
import { logger } from "../utils/Logger"
import { pokeApi, sandboxApi } from "./AxiosService"

class PokemansService {
  async getPokemans() {
    const res = await pokeApi.get()
    logger.log(res.data)
    AppState.pokemans = res.data.results
    AppState.nextPage = res.data.next
    AppState.previousPage = res.data.previous
  }

  async changePage(url) {
    const res = await pokeApi.get(url)
    logger.log(res.data)
    AppState.pokemans = res.data.results
    AppState.nextPage = res.data.next
    AppState.previousPage = res.data.previous
  }

  async setActive(url) {
    const res = await pokeApi.get(url)
    logger.log(res.data)
    AppState.activePokeman = new Pokeman(res.data)
  }

  async catchPokeman() {
    const res = await sandboxApi.post('', AppState.activePokeman)
    logger.log(res.data)
    AppState.myPokemans.push(new Pokeman(res.data))
  }

  async getMyPokemans() {
    const res = await sandboxApi.get()
    logger.log('sandbox', res.data)
    AppState.myPokemans = res.data.map(p => new Pokeman(p))
  }
}

export const pokemansService = new PokemansService()