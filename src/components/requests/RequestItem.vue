<template>
  <li>
    <div>
      <a :href="emailLink">{{ email }}</a>
      <p>{{ message }}</p>
    </div>
  </li>
</template>

<script>
import { computed } from 'vue'
export default {
  props: ['email', 'message'],
  setup(props) {
    const emailLink = computed(() => {
      return 'mailto:' + props.email
    })

    return { emailLink }
  }
}
</script>

<style lang="scss" scoped>
li {
  margin: 1rem 0;
  border: 1px solid #ccc;
  padding: 1rem;

  a {
    color: #3d008d;
    text-decoration: none;
    font-weight: bold;

    &:hover,
    &:active {
      color: #8d007a;
    }
  }
}

p {
  margin: 0.5rem 0 0 0;
}
</style>
