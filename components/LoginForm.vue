<template>
  <b-form @submit.prevent="onSubmit">
    <b-form-group id="input-group-email" label="Email" label-for="input-email">
      <b-form-input
        id="input-email"
        v-model="form.email"
        type="email"
        required
        placeholder="Enter email"
        :readonly="readonly"
      ></b-form-input>
    </b-form-group>
    <b-form-group id="input-group-pass" label="Password" label-for="input-pass">
      <b-form-input
        id="input-pass"
        v-model="form.password"
        type="password"
        required
        placeholder="Enter your password"
        :readonly="readonly"
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
        :readonly="readonly"
      ></b-form-input>
    </b-form-group>
    <b-alert v-model="showAlert" variant="danger" dismissible>
      {{ error }}
    </b-alert>
    <b-button block type="submit" variant="primary" :disabled="loading">
      <i v-if="loading" class="fas fa-spinner fa-spin"></i>
      <span v-else>Log In</span>
    </b-button>
    <b-button block type="reset" variant="default" size="sm">Clear</b-button>
    <b-button
      v-if="masterp"
      block
      type="reset"
      variant="default"
      size="sm"
      @click="removeMasterP"
    >
      Log In from a new device?
    </b-button>
  </b-form>
</template>

<script>
import { BButton, BForm, BFormInput, BFormGroup, BAlert } from 'bootstrap-vue'
import MasterP from '@/mixins/MasterP'

export default {
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
      },
      showAlert: !!this.error,
      readonly: true
    }
  },
  watch: {
    error(newValue) {
      if (newValue) {
        this.showAlert = true
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.readonly = false
    }, 0)
  },
  methods: {
    onSubmit() {
      this.form.masterp = this.masterp ? this.masterp : this.form.masterp
      this.$emit('onSubmitLogin', this.form)
    }
  }
}
</script>
