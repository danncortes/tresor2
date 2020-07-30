<template>
  <b-form class="change-password-form" @submit.prevent="onSubmit">
    <b-form-group
      id="input-group-current-pass-change"
      label="Current Password"
      label-for="current-pass-change"
    >
      <b-form-input
        id="current-pass-change"
        v-model="form.currentPassword"
        type="password"
        required
        placeholder="Enter your current password"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      id="input-group-pass-change"
      label="New Password"
      label-for="new-pass-change"
    >
      <b-form-input
        id="new-pass-change"
        v-model="form.newPassword"
        type="password"
        required
        placeholder="Enter your new password"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="input-group-confirm-pass"
      label="Confirm New Password"
      label-for="input-confirm-pass"
    >
      <b-form-input
        id="input-confirm-pass"
        v-model="form.confirmNewPassword"
        type="password"
        required
        placeholder="Confirm your new password"
      ></b-form-input>
    </b-form-group>
    <b-button
      block
      type="submit"
      variant="primary"
      :disabled="isLoading || !passMatch"
    >
      <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
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
    isLoading: {
      type: Boolean
    }
  },
  data() {
    return {
      form: {
        currentPassword: '',
        newPassword: ''
      }
    }
  },
  computed: {
    passMatch() {
      return (
        this.form.newPassword === this.form.confirmNewPassword &&
        this.form.newPassword !== this.form.currentPassword
      )
    }
  },
  methods: {
    onSubmit() {
      this.$emit('onSubmitChangePass', {
        currentPassword: this.form.currentPassword,
        newPassword: this.form.newPassword
      })
    }
  }
})
</script>
