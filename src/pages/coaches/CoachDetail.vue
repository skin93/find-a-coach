<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>
            Interested? Reach out now!
          </h2>
          <base-button link :to="contactLink">Contact</base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="area in selectedCoach.areas"
          :key="area"
          :type="area"
          :title="area"
        >
        </base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
export default {
  props: ['id'],
  setup(props) {
    const store = useStore()
    const selectedCoach = ref(null)

    selectedCoach.value = store.getters['coaches/coaches'].find(
      (coach) => coach.id === props.id
    )

    const fullName = computed(() => {
      return selectedCoach.value.firstName + ' ' + selectedCoach.value.lastName
    })
    const contactLink = computed(() => {
      return store.path + '/' + props.id + '/contact'
    })
    const areas = computed(() => {
      return selectedCoach.value.areas
    })
    const rate = computed(() => {
      return selectedCoach.value.hourlyRate
    })
    const description = computed(() => {
      return selectedCoach.value.description
    })

    return { selectedCoach, fullName, contactLink, areas, rate, description }
  }
}
</script>

<style lang="scss" scoped></style>
