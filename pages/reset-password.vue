<template>
  <div class="d-flex justify-content-center">
    <b-spinner v-if="isProcessing" medium label="Spinning"></b-spinner>
    <b-alert v-else-if="!token || isBadToken" :show="true" variant="danger">
      It looks like the verification token is not valid. <br />
      Login to your account to resend the verification token
    </b-alert>
    <ResetPasswordForm
      v-else-if="isVerified && !isResetSuccess"
      class="w-100"
      :loading="isResetInProgress"
      @onSubmitReset="onSubmitReset"
    />
    <div v-if="isResetSuccess">
      <p>Your password was reset successfully</p>
      <div class="d-flex justify-content-center">
        <b-button variant="primary" href="/login" size="sm">Login</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { BButton, BAlert } from 'bootstrap-vue'
import ResetPasswordForm from '@/components/ResetPasswordForm.vue'
export default Vue.extend({
  components: {
    ResetPasswordForm,
    BAlert,
    BButton
  },
  data() {
    return {
      isVerified: false,
      isProcessing: false,
      isBadToken: false,
      isResetInProgress: false,
      isResetSuccess: false,
      userEmail: ''
    }
  },
  computed: {
    token() {
      return this.$route.query.verification_token
    }
  },
  mounted() {
    if (this.token) {
      this.verifyToken()
    }
  },
  methods: {
    async verifyToken() {
      this.isProcessing = true
      try {
        const response = await this.$axios.$post('password/verify', {
          token: this.token
        })
        this.userEmail = response.email
        this.isVerified = true
      } catch (err) {
        this.isBadToken = true
      } finally {
        this.isProcessing = false
      }
    },
    async onSubmitReset(form) {
      this.isResetInProgress = true
      this.isResetSuccess = false
      try {
        await this.$axios.$post('password/reset', {
          password: form.password,
          email: this.userEmail,
          token: this.$route.query.verification_token
        })
        this.isResetSuccess = true
      } catch (err) {
        this.$bvToast.toast('There was an error reseting your password', {
          title: 'Error',
          variant: 'danger',
          solid: false,
          autoHideDelay: 3000,
          toaster: 'b-toaster-bottom-center'
        })
      } finally {
        this.isResetInProgress = false
      }
    }
  }
})
</script>
