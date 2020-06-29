<template>
  <div class="d-flex justify-content-center">
    <b-spinner v-if="isProcessing" medium label="Spinning"></b-spinner>
    <p v-else-if="!token || isBadToken">
      It looks like the verification token is not valid, login into your account
      to resend the verification token
    </p>
    <div
      v-else-if="isVerified"
      class="d-flex flex-column justify-content-center"
    >
      <p>Your account has been activated</p>
      <b-button variant="primary" href="/login" size="sm">Login</b-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { BButton } from 'bootstrap-vue'
export default Vue.extend({
  components: {
    BButton
  },
  data() {
    return {
      isVerified: false,
      isProcessing: false,
      isBadToken: false
    }
  },
  computed: {
    token() {
      return this.$route.query.verification_token
    }
  },
  mounted() {
    if (this.token) {
      this.verifyAccount()
    }
  },
  methods: {
    async verifyAccount() {
      this.isProcessing = true
      try {
        await this.$axios.$post('verify', { token: this.token })
        this.isVerified = true
      } catch (err) {
        this.isBadToken = true
      } finally {
        this.isProcessing = false
      }
    }
  }
})
</script>

<style lang="sass"></style>
