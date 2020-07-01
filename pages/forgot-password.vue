<template>
  <div class="d-flex justify-content-center">
    <div>
      <p>
        Enter your email to send you a link to reset your password
      </p>
      <b-form class="login-form mb-4" @submit.prevent="onSubmit">
        <b-form-group id="input-group-email" label-for="input-email">
          <b-form-input
            id="input-email"
            v-model="form.email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>
        <b-button
          block
          type="submit"
          variant="primary"
          :disabled="isProcessing || !form.email"
        >
          <b-spinner v-if="isProcessing" small label="Spinning"></b-spinner>
          <span v-else>Send</span>
        </b-button>
      </b-form>

      <b-button block variant="default" href="/login">
        Back to Login
      </b-button>
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
      isProcessing: false,
      isError: false,
      form: {
        email: ''
      },
      showAlert: true
    }
  },
  methods: {
    async onSubmit() {
      this.isProcessing = true
      this.isError = false
      try {
        await this.$axios.$post('password', { email: this.form.email })
        this.showToast({
          title: 'Done!',
          message: 'The email has been sent successfully, check your inbox!',
          variant: 'success'
        })
      } catch (err) {
        this.isError = true
        this.showToast({
          title: 'Error',
          message: 'There was an error sending the email',
          variant: 'danger'
        })
      } finally {
        this.isProcessing = false
        this.form = {
          ...this.form,
          email: ''
        }
      }
    },
    showToast({ title, message, variant }) {
      this.$bvToast.toast(message, {
        title,
        variant,
        solid: false,
        autoHideDelay: 3000,
        toaster: 'b-toaster-bottom-center'
      })
    }
  }
})
</script>
