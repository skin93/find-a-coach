<template>
  <base-card>
    <h2>Find Your Coach</h2>
    <span class="filter-option">
      <input type="checkbox" id="frontend" checked @change="setFilter" />
      <label for="frontend">Frontend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="backend" checked @change="setFilter" />
      <label for="backend">Backend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="career" checked @change="setFilter" />
      <label for="career">Career</label>
    </span>
  </base-card>
</template>

<script>
import { reactive } from 'vue'
export default {
  emits: ['change-filter'],
  setup(_, context) {
    const filters = reactive({
      frontend: true,
      backend: true,
      career: true
    })

    function setFilter(event) {
      const inputId = event.target.id
      const isActive = event.target.checked
      const updatedFilters = {
        ...filters,
        [inputId]: isActive
      }

      filters.frontend = updatedFilters.frontend
      filters.backend = updatedFilters.backend
      filters.career = updatedFilters.career

      context.emit('change-filter', updatedFilters)
    }

    return { filters, setFilter }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;

  &.active {
    label {
      font-weight: bold;
    }
  }

  input {
    vertical-align: middle;
  }

  label {
    @extend input;
    margin-left: 0.25rem;
  }
}
</style>
