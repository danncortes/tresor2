<template>
  <div>
    <p>
      Verify your account to start using Tresor. Check your email and use the
      link sent after the registration.
    </p>
    <p>Can't you find the email?</p>
    <div class="d-flex justify-content-center">
      <div class="d-flex flex-column">
        <div class="d-flex justify-content-center">
          <b-button
            variant="primary"
            size="sm"
            class="mb-2"
            @click="resendVerificationToken"
          >
            <b-spinner v-if="isProcessing" small label="Spinning"></b-spinner>
            <span v-else>Re-send verification token</span>
          </b-button>
        </div>
        <p v-if="isError">There was an error sending the verification token</p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { BButton } from 'bootstrap-vue'
export default Vue.extend({
  middleware({ $auth, redirect }) {
    if ($auth.$state.user && $auth.$state.user.verified) {
      redirect('/')
    }
  },
  components: {
    BButton
  },
  data() {
    return {
      isProcessing: false,
      isError: false
    }
  },
  mounted() {},
  methods: {
    async resendVerificationToken() {
      this.isProcessing = true
      this.isError = false
      try {
        await this.$axios.$post('verify/new')
      } catch (err) {
        this.isError = true
      } finally {
        this.isProcessing = false
      }
    }
  }
})
</script>
