<template>
  <b-tabs card justified>
    <b-tab title="Login" active>
      <LoginForm
        :error="loginError"
        :loading="loginLoading"
        @onSubmitLogin="onSubmitLogin"
      ></LoginForm>
    </b-tab>
    <b-tab title="Sign Up">
      <!-- <SignUpForm
          :error="userState.signUp.error"
          :loading="userState.signUp.loading"
          @onSubmitSignUp="onSubmitSignUp"
        ></SignUpForm> -->
    </b-tab>
  </b-tabs>
</template>

<script lang="ts">
import Vue from 'vue'
import { BTabs, BTab } from 'bootstrap-vue'
import LoginForm from '@/components/LoginForm.vue'

export default Vue.extend({
  components: {
    BTabs,
    BTab,
    LoginForm
    // SignUpForm
  },
  data() {
    return {
      loginLoading: false,
      loginError: null,
      signupLoading: false,
      signupError: null
    }
  },
  created() {},
  methods: {
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
        // @ts-ignore
        this.loginError = 'There was an error Logging In'
      } finally {
        this.loginLoading = false
      }
    }
  }
})
</script>
