<template>
  <div v-if="pokeman" class="bg-light d-flex flex-column align-items-center">
    <img :src="pokeman.img" alt="" />
    {{ pokeman.name }}
    <button @click="catchPokeman()" class="btn btn-outline-danger">
      <i class="mdi mdi-pokeball"></i> CATCH
    </button>
  </div>
</template>


<script>
import { Pokeman } from '../Models/Pokeman'
import { pokemansService } from '../services/PokemansService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
  props: {
    pokeman: {
      type: Pokeman,
      required: true
    }
  },
  setup() {
    return {
      async catchPokeman() {
        try {
          await pokemansService.catchPokeman()
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>