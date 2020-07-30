<template>
  <b-form class="reset-password-form" @submit.prevent="onSubmit">
    <b-form-group
      id="input-group-pass-reset"
      label="Password"
      label-for="input-pass-reset"
    >
      <b-form-input
        id="input-pass-reset"
        v-model="form.password"
        type="password"
        required
        placeholder="Enter your new password"
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
        placeholder="Confirm your new password"
      ></b-form-input>
    </b-form-group>
    <b-button
      block
      type="submit"
      variant="primary"
      :disabled="loading || !passMatch"
    >
      <b-spinner v-if="loading" small label="Spinning"></b-spinner>
      <span v-else>Save</span>
    </b-button>
  </b-form>
</template>

<script>
import Vue from 'vue'
import { BButton, BForm, BFormInput, BFormGroup } from 'bootstrap-vue'
export default Vue.extend({
  components: {
    BButton,
    BForm,
    BFormInput,
    BFormGroup
  },
  props: {
    loading: {
      type: Boolean
    }
  },
  data() {
    return {
      form: {
        password: ''
      }
    }
  },
  computed: {
    passMatch() {
      return this.form.password === this.form.confirmPassword
    }
  },
  methods: {
    onSubmit() {
      this.$emit('onSubmitReset', this.form)
    }
  }
})
</script>
