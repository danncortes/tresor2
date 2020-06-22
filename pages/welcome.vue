<template>
  <div class="welcome-view p-2">
    <h3>Welcome to Tresor</h3>
    <p>
      This is your Master Password and here there are some important details to
      know about it:
    </p>
    <ul>
      <li>It will be used to encrypt all your credentials</li>
      <li>It's unique and not recoverable/resetable</li>
      <li>It will be required every time you login in a new device</li>
    </ul>
    <p class="mb-4">
      Since
      <strong> this is not your login password (which you can reset)</strong>,
      you must save this Master Password in a secure place.
    </p>
    <div class="d-flex">
      <div>
        <div
          class="welcome-view__mastep border rounded p-2 text-info mb-2 text-center"
        >
          <strong>{{ masterp }}</strong>
        </div>
        <p class="text-info">
          Copy and Save this Master Password in a secure place!
        </p>
      </div>
    </div>
    <div class="d-flex justify-content-end">
      <b-button type="reset" variant="primary" size="sm" @click="goToDashboard">
        Continue <font-awesome-icon :icon="['fas', 'arrow-circle-right']" />
      </b-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BButton } from 'bootstrap-vue'
export default Vue.extend({
  components: {
    BButton
  },
  data() {
    return {
      masterp: this.$route.params.masterp
    }
  },
  created() {
    if (!this.masterp) {
      this.goToDashboard()
    }
  },
  methods: {
    goToDashboard() {
      this.$router.push('/')
    }
  }
})
</script>
