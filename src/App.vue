<template>
  <the-header></the-header>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
import { useStore } from 'vuex'
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import TheHeader from './components/layout/TheHeader'
export default {
  components: {
    TheHeader
  },

  setup() {
    const router = useRouter()
    const store = useStore()

    store.dispatch('autoLogin')

    const didAutoLogout = computed(function() {
      return store.getters.didAutoLogout
    })

    watch(didAutoLogout, function(curValue, oldValue) {
      if (curValue && curValue !== oldValue) {
        router.replace('/coaches')
      }
    })

    return { didAutoLogout }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', 'san-serif';
}

body {
  margin: 0;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
