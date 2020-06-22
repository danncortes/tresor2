<template>
  <div class="login-register-view">
    <div v-if="showLogin">
      <h3 class="form-title text-white mb-3">Login</h3>
      <LoginForm
        :error="loginError"
        :loading="loginLoading"
        @onSubmitLogin="onSubmitLogin"
      ></LoginForm>
    </div>
    <div v-else>
      <h3 class="form-title text-white mb-3">Create Account</h3>
      <SignUpForm
        :error="signupError"
        :loading="signupLoading"
        @onSubmitSignUp="onSubmitSignUp"
      ></SignUpForm>
    </div>
    <b-button
      block
      variant="default"
      size="sm"
      class="toggle-form-button"
      @click="toggleForm"
      >{{ toggleFormText }}</b-button
    >
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BButton } from 'bootstrap-vue'
import { v4 as uuidv4 } from 'uuid'
import LoginForm from '@/components/LoginForm.vue'
import SignUpForm from '@/components/SignUpForm.vue'

export default Vue.extend({
  components: {
    LoginForm,
    BButton,
    SignUpForm
  },
  data() {
    return {
      showLogin: true as boolean,
      loginLoading: false as boolean,
      loginError: null as String | null,
      signupLoading: false as boolean,
      signupError: null as String | null
    }
  },
  computed: {
    toggleFormText(): string {
      return this.showLogin ? 'Create an Account' : 'Log in'
    }
  },
  watch: {
    showLogin(newValue) {
      // Remove errors when user change forms
      if (newValue) {
        this.signupError = null
      } else {
        this.loginError = null
      }
    }
  },
  methods: {
    toggleForm() {
      this.showLogin = !this.showLogin
    },
    async onSubmitLogin(form: object) {
      try {
        this.loginError = null
        this.loginLoading = true
        // @ts-ignore
        await this.$auth.loginWith('local', { data: { ...form } })
        // @ts-ignore
        await this.$cookies.set('masterp', form.masterp)
        this.$router.push('/')
      } catch (err) {
        this.loginError = 'There was an error Logging In'
      } finally {
        this.loginLoading = false
      }
    },
    async onSubmitSignUp(form: object) {
      try {
        this.signupError = null
        this.signupLoading = true
        const masterp: string = uuidv4()
        const newUserData = {
          ...form,
          masterp
        }
        await this.$axios.$post('users', newUserData)
        // @ts-ignore
        await this.$auth.loginWith('local', { data: { ...newUserData } })
        // @ts-ignore
        await this.$cookies.set('masterp', masterp)
        this.$router.push({ name: 'welcome', params: { masterp } })
      } catch (err) {
        this.signupError = 'There was an error Signing In'
      } finally {
        this.signupLoading = false
      }
    }
  }
})
</script>

<style lang="scss">
.login-form,
.signup-form {
  label,
  .reset-button,
  .clear-button {
    color: #ccc;
  }
}

.toggle-form-button,
.toggle-form-button:hover {
  color: #ccc;
  font-weight: bold;
}
</style>
