<template>
  <div class="welcome-view p-2">
    <div v-if="isProcessing" class="d-flex justify-content-center">
      <b-spinner medium label="Spinning"></b-spinner>
    </div>
    <div v-else-if="masterpFromParam">
      <h3>Welcome to Tresor</h3>
      <p>
        This is your Master Password and here there are some important details
        to know about it:
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
        <div class="w-100">
          <div class="welcome-view__mastep mb-2" @click="onCopyMasterp">
            <input
              ref="masterp"
              class="border rounded p-2 text-info text-center cursor-pointer font-weight-bold w-100"
              type="text"
              :value="masterpFromParam"
            />
          </div>
          <b-alert
            v-if="isMasterpCopied"
            :show="true"
            variant="success"
            class="text-center"
          >
            Copied!
          </b-alert>
          <p v-else class="text-info">
            Copy and Save this Master Password in a secure place!
          </p>
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <b-button
          type="reset"
          variant="primary"
          size="sm"
          @click="goToDashboard"
        >
          Continue <font-awesome-icon :icon="['fas', 'arrow-circle-right']" />
        </b-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BButton } from 'bootstrap-vue'
import MasterP from '@/mixins/MasterP'
export default Vue.extend({
  components: {
    BButton
  },
  mixins: [MasterP],
  middleware: ['auth', 'masterp'],
  data() {
    return {
      isProcessing: true,
      masterpFromParam: this.$route.params.masterp
    }
  },
  mounted() {
    if (!this.masterpFromParam) {
      this.goToDashboard()
    } else {
      this.isProcessing = false
    }
  },
  methods: {
    goToDashboard() {
      this.$router.push('/')
    }
  }
})
</script>
