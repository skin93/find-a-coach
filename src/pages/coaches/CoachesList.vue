<template>
  <div>
    <base-dialog :show="!!error" title="An error occured" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)"
            >REFRESH</base-button
          >
          <base-button link to="/auth?redirect=register" v-if="!isLoggedIn"
            >Login to Register as Coach</base-button
          >
          <base-button
            v-if="isLoggedIn && !isCoach && !isLoading"
            link
            to="/register"
            >Register a Coach</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          ></coach-item>
        </ul>
        <h3 v-else>No coaches</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem'
import CoachFilter from '../../components/coaches/CoachFilter'
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
export default {
  components: {
    CoachItem,
    CoachFilter
  },
  setup() {
    const store = useStore()

    const isLoading = ref(false)
    const error = ref(null)
    const activeFilters = reactive({
      frontend: true,
      backend: true,
      career: true
    })

    const setFilters = (updatedFilters) => {
      activeFilters.frontend = updatedFilters.frontend
      activeFilters.backend = updatedFilters.backend
      activeFilters.career = updatedFilters.career
    }

    const loadCoaches = async (refresh = false) => {
      isLoading.value = true
      try {
        await store.dispatch('coaches/loadCoaches', {
          forceRefresh: refresh
        })
      } catch (err) {
        error.value = err.message || 'Something went worng!'
      }
      isLoading.value = false
    }
    const handleError = () => {
      error.value = null
    }

    const isLoggedIn = computed(() => {
      return store.getters.isAuthenticated
    })
    const isCoach = computed(() => {
      return store.getters['coaches/isCoach']
    })
    const filteredCoaches = computed(() => {
      const coaches = store.getters['coaches/coaches']
      return coaches.filter((coach) => {
        if (activeFilters.frontend && coach.areas.includes('frontend')) {
          return true
        }
        if (activeFilters.backend && coach.areas.includes('backend')) {
          return true
        }
        if (activeFilters.career && coach.areas.includes('career')) {
          return true
        }
        return false
      })
    })

    const hasCoaches = computed(() => {
      return !isLoading.value && store.getters['coaches/hasCoaches']
    })

    loadCoaches()

    return {
      isLoading,
      error,
      activeFilters,
      setFilters,
      handleError,
      isLoggedIn,
      isCoach,
      filteredCoaches,
      hasCoaches
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
