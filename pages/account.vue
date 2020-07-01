<template>
  <div class="d-flex flex-column justify-content-center">
    <div v-if="isProcessing" class="d-flex justify-content-center">
      <b-spinner medium label="Spinning"></b-spinner>
    </div>
    <b-alert v-else-if="!token || isBadToken" :show="true" variant="danger">
      It looks like the verification token is not valid. <br />
      Login into your account to re-send the verification token
    </b-alert>
    <div v-else-if="isVerified">
      <p>Your account has been activated</p>
    </div>
    <div class="d-flex justify-content-center">
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
