<template>
  <b-tabs card justified>
    <b-tab title="Login" active>
      <!-- <LoginForm
          :error="userState.login.error"
          :loading="userState.login.loading"
          @onSubmitLogin="onSubmitLogin"
        ></LoginForm> -->

      {{ this.$store.state.users }}
      <div @click="doSomething">Here</div>
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

export default Vue.extend({
  components: {
    BTabs,
    BTab
    // LoginForm,
    // SignUpForm
  },
  updated() {
    // console.log(this.$store.commit)
  },
  methods: {
    doSomething() {
      this.$store.dispatch('users/add')
    }
  }
})
</script>
