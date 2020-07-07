<template>
  <div>
    <h3 class="mb-4">My profile</h3>
    <h5>Email Account</h5>
    <p>{{ $auth.user.email }}</p>
    <hr />
    <h5>Master Key</h5>
    <div v-if="showMasterP">
      <input
        ref="masterp"
        class="border rounded p-2 text-info text-center cursor-pointer font-weight-bold w-100 mb-1"
        type="text"
        :value="masterp"
        @click="onCopyMasterp"
      />
      <b-button block class="mb-2" @click="toggleMasterP">
        Hide Master Key
      </b-button>
      <b-alert
        v-if="isMasterpCopied"
        :show="true"
        variant="success"
        class="text-center"
      >
        Copied!
      </b-alert>
    </div>
    <b-button
      v-else
      block
      variant="primary"
      class="mb-2"
      @click="toggleMasterP"
    >
      Reveal Master Key
    </b-button>
    <p>
      Remember, the Master Key is used to encrypt all your credentials, and it
      can not be reset or changed. <br />
      Save it in a secure place.
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MasterP from '@/mixins/MasterP'
export default Vue.extend({
  middleware: ['auth', 'masterp', 'isVerified'],
  mixins: [MasterP],
  data() {
    return {
      showMasterP: false
    }
  },
  methods: {
    toggleMasterP() {
      this.showMasterP = !this.showMasterP
    }
  }
})
</script>
