<template>
  <b-form class="login-form" @submit.prevent="onSubmit">
    <b-form-group id="input-group-email" label="Email" label-for="input-email">
      <b-form-input
        id="input-email"
        v-model="form.email"
        type="email"
        required
        placeholder="Enter email"
      ></b-form-input>
    </b-form-group>
    <b-form-group id="input-group-pass" label="Password" label-for="input-pass">
      <b-form-input
        id="input-pass"
        v-model="form.password"
        type="password"
        required
        placeholder="Enter your password"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      v-if="!masterp"
      id="input-group-masterp-login"
      label="Master Password"
      label-for="input-masterp-login"
    >
      <b-form-input
        id="input-masterp-login"
        v-model="form.masterp"
        type="password"
        :required="!masterp"
        placeholder="Enter your Master Password"
      ></b-form-input>
    </b-form-group>
    <b-alert :show="showAlert" variant="danger" dismissible>
      {{ error }}
    </b-alert>
    <b-button block type="submit" variant="primary" :disabled="loading">
      <b-spinner v-if="loading" small label="Spinning"></b-spinner>
      <span v-else>Log In</span>
    </b-button>
    <b-button
      block
      type="reset"
      variant="default"
      size="sm"
      class="clear-button"
      >Clear</b-button
    >
    <b-button
      v-if="masterp"
      block
      type="reset"
      variant="default"
      size="sm"
      class="reset-button"
      @click="removeMasterP"
    >
      Log In from a new device?
    </b-button>
  </b-form>
</template>

<script>
import Vue from 'vue'
import { BButton, BForm, BFormInput, BFormGroup, BAlert } from 'bootstrap-vue'
import MasterP from '@/mixins/MasterP'

export default Vue.extend({
  components: {
    BButton,
    BForm,
    BFormInput,
    BFormGroup,
    BAlert
  },
  mixins: [MasterP],
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
        password: '',
        masterp: ''
      }
    }
  },
  computed: {
    showAlert() {
      return !!this.error
    }
  },
  methods: {
    onSubmit() {
      this.form.masterp = this.masterp ? this.masterp : this.form.masterp
      this.$emit('onSubmitLogin', this.form)
    }
  }
})
</script>
