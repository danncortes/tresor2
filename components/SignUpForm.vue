<template>
  <b-form class="signup-form" @submit.prevent="onSubmit">
    <b-form-group
      id="input-group-email-signup"
      label="Email"
      label-for="input-email-signup"
    >
      <b-form-input
        id="input-email-signup"
        v-model="form.email"
        type="email"
        required
        placeholder="Enter email"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="input-group-pass-signup"
      label="Password"
      label-for="input-pass-signup"
    >
      <b-form-input
        id="input-pass-signup"
        v-model="form.password"
        type="password"
        required
        placeholder="Enter your password"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="input-group-confirm-pass"
      label="Confirm Password"
      label-for="input-confirm-pass"
    >
      <b-form-input
        id="input-confirm-pass"
        v-model="form.confirmPassword"
        type="password"
        required
        placeholder="Confirm your password"
      ></b-form-input>
    </b-form-group>
    <b-alert :show="showAlert" variant="danger" dismissible>
      {{ error }}
    </b-alert>
    <b-button
      block
      type="submit"
      variant="primary"
      :disabled="loading || !passMatch"
    >
      <b-spinner v-if="loading" small label="Spinning"></b-spinner>
      <span v-else>Sign Up</span>
    </b-button>
    <b-button
      class="clear-button"
      block
      type="reset"
      variant="default"
      size="sm"
      >Clear</b-button
    >
  </b-form>
</template>

<script>
import Vue from 'vue'
import { BButton, BForm, BFormInput, BFormGroup, BAlert } from 'bootstrap-vue'
export default Vue.extend({
  components: {
    BButton,
    BForm,
    BFormInput,
    BFormGroup,
    BAlert
  },
  props: {
    error: {
      type: [String, Boolean],
      default: null
    },
    loading: {
      type: Boolean
    }
  },
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      readonly: true
    }
  },
  computed: {
    passMatch() {
      return this.form.password === this.form.confirmPassword
    },
    showAlert() {
      return !!this.error
    }
  },
  methods: {
    onSubmit() {
      this.$emit('onSubmitSignUp', this.form)
    }
  }
})
</script>
