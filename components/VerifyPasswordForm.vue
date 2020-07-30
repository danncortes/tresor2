<template>
  <b-form class="verify-password-form" @submit.prevent="onSubmitVerify">
    <b-form-group
      id="input-group-pass"
      label="Password"
      label-for="input-pass"
    >
      <b-form-input
        id="input-pass"
        v-model="form.password"
        type="password"
        required
        placeholder="Enter your password"
      ></b-form-input>
    </b-form-group>
    <b-button
      block
      type="submit"
      variant="primary"
      :disabled="isVerificationInProgress || isFormInvalid"
    >
      <b-spinner v-if="isVerificationInProgress" small label="Spinning"></b-spinner>
      <span v-else>{{ callToActionText }}</span>
    </b-button>
  </b-form>
</template>

<script>
export default {
  data() {
    return {
      isVerificationInProgress: false,
      form: {
        password: ''
      }
    }
  },
  methods: {
    async onSubmitVerify() {
      this.isVerificationInProgress = true
      try {
        await this.$axios.$post('password/check-password', { password: this.form.password })
        this.$emit('passwordVerified')
        this.form.password = ''
      } catch (err) {
        this.$bvToast.toast('There was an error verifiying your password', {
          title: 'Error',
          variant: 'danger',
          solid: true,
          autoHideDelay: 3000,
          toaster: 'b-toaster-bottom-center'
        })
      } finally {
        this.isVerificationInProgress = false
      }
    }
  },
  computed: {
    isFormInvalid() {
      return !this.form.password
    }
  },
  props: {
    callToActionText: {
      required: false,
      default: 'Verify',
      type: String
    }
  }
}
</script>