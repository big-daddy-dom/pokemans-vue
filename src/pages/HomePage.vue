<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-4">
        <ul>
          <li
            @click="setActive(p.url)"
            class="my-2 selectable"
            v-for="p in pokemans"
            :key="p.name"
          >
            {{ p.name }}
          </li>
        </ul>
        <button
          :class="`btn btn-danger ${previousPage ? '' : 'disabled'}`"
          @click="changePage(previousPage)"
          :disabled="!previousPage"
        >
          Previous
        </button>
        <button class="btn btn-danger" @click="changePage(nextPage)">
          Next
        </button>
      </div>
      <div class="col-8">
        <ActivePokeman :pokeman="activePokeman" />
      </div>
    </div>
  </div>
  <OffCanvas>
    <template #offcanvas-header>MY POKEMANS</template>
    <template #offcanvas-body>
      <ul>
        <li
          @click="setActive(p.url)"
          class="my-2 selectable"
          v-for="p in myPokemans"
          :key="p.name"
        >
          {{ p.name }}
        </li>
      </ul>
    </template>
  </OffCanvas>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { logger } from '../utils/Logger'
import { pokemansService } from '../services/PokemansService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
export default {
  setup() {
    onMounted(async () => {
      try {
        await pokemansService.getPokemans()
        await pokemansService.getMyPokemans()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      pokemans: computed(() => AppState.pokemans),
      myPokemans: computed(() => AppState.myPokemans),
      nextPage: computed(() => AppState.nextPage),
      previousPage: computed(() => AppState.previousPage),
      activePokeman: computed(() => AppState.activePokeman),
      async changePage(url) {
        try {
          await pokemansService.changePage(url)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async setActive(url) {
        try {
          await pokemansService.setActive(url)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>

