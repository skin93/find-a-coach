<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstname">First Name</label>
      <input
        type="text"
        id="firstname"
        v-model.trim="firstName.val"
        @blur="clearValidity('firstName')"
      />
      <p v-if="!firstName.isValid">First Name must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lastname">Last Name</label>
      <input
        type="text"
        id="lastname"
        v-model.trim="lastName.val"
        @blur="clearValidity('lastName')"
      />
      <p v-if="!lastName.isValid">Last Name must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Description</label>
      <textarea
        id="textarea"
        rows="5"
        v-model.trim="description.val"
        @blur="clearValidity('description')"
      ></textarea>
      <p v-if="!description.isValid">Description must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="rate">Hourly Rate</label>
      <input
        type="number"
        id="rate"
        v-model.number="rate.val"
        @blur="clearValidity('rate')"
      />
    </div>
    <p v-if="!rate.isValid">Rate must be greater than 0.</p>
    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>Areas of Experties</h3>
      <div>
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="career"
          value="career"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="career">Career Advisory</label>
      </div>
      <p v-if="!areas.isValid">At least one expertise must be selected.</p>
    </div>
    <p v-if="!formIsValid">Please fix the above errors and submit again.</p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
import { ref, reactive } from 'vue'
export default {
  emits: ['save-data'],
  setup(_, context) {
    const firstName = reactive({
      val: '',
      isValid: true
    })

    const lastName = reactive({
      val: '',
      isValid: true
    })

    const description = reactive({
      val: '',
      isValid: true
    })

    const rate = reactive({
      val: null,
      isValid: true
    })

    const areas = reactive({
      val: [],
      isValid: true
    })

    const formIsValid = ref(true)

    function clearValidity(input) {
      context[input].isValid = true
    }

    const validateForm = () => {
      formIsValid.value = true
      if (firstName.val === '') {
        firstName.isValid = false
        formIsValid.value = false
      }
      if (lastName.val === '') {
        lastName.isValid = false
        formIsValid.value = false
      }
      if (description.val === '') {
        description.isValid = false
        formIsValid.value = false
      }
      if (!rate.val || rate.val < 0) {
        rate.isValid = false
        formIsValid.value = false
      }
      if (areas.val.length === 0) {
        areas.isValid = false
        formIsValid.value = false
      }
    }

    const submitForm = () => {
      validateForm()

      if (!formIsValid.value) {
        return
      }

      const formData = {
        first: firstName.val,
        last: lastName.val,
        desc: description.val,
        rate: rate.val,
        areas: areas.val
      }
      context.emit('save-data', formData)
    }

    return {
      firstName,
      lastName,
      description,
      rate,
      areas,
      formIsValid,
      clearValidity,
      submitForm
    }
  }
}
</script>

<style lang="scss" scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;

  &:focus {
    background-color: #f0e6fd;
    outline: none;
    border-color: #3d008d;
  }
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;

  &:focus {
    outline: #3d008d solid 1px;
  }
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid {
  label {
    color: red;
  }
  input,
  textarea {
    border: 1px solid red;
  }
}
</style>
