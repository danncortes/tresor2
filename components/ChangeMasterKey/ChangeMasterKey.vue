<template>
  <div>
    <h5 class="mb-3">Change Master Key</h5>
    <div v-if="isPasswordVerified">
    <ChangeMasterKeyForm @onSubmitChange="onSubmitChangeMasterKey" :processing="isChangeMasterKeyInProgress"/>
    </div>
    <div v-else-if="isChangeMasterKeyActive">
      <!-- Check password here -->
      <p>We suggest downloading your credentials first in case of any issue during the Master Key changing process.</p>
      <VerifyPasswordForm
        @passwordVerified="() => { isPasswordVerified = true }"
      />
    </div>
    <div v-else class="d-flex">
      <b-button block class="mb-2" @click="() => { isChangeMasterKeyActive = true }">
        Change Master Key
      </b-button>
    </div>
    <b-button v-if="isPasswordVerified || isChangeMasterKeyActive" variant="default" block class="mb-2" @click="cancel">
        Cancel
      </b-button>
  </div>
</template>

<script>
import Vue from 'vue'
import MasterP from '@/mixins/MasterP'
import VerifyPasswordForm from '@/components/VerifyPasswordForm.vue'
import ChangeMasterKeyForm from '@/components/ChangeMasterKeyForm.vue'

export default Vue.extend({
  mixins: [MasterP],
  components: {
    VerifyPasswordForm,
    ChangeMasterKeyForm
  },
  data() {
    return {
      isChangeMasterKeyActive: false,
      isPasswordVerified: false,
      isChangeMasterKeyInProgress: false
    }
  },
  methods: {
    cancel() {
      this.isChangeMasterKeyActive = false
      this.isPasswordVerified = false
      
    },
    async onSubmitChangeMasterKey(form) {
      this.isChangeMasterKeyInProgress = true
      try {
        await this.$axios.$post('users/change-master-key', { newMasterKey: form.masterKey, masterp:  this.masterp})

        this.$bvToast.toast('Your Master Key was changed successfully', {
          title: 'Done!',
          variant: 'success',
          solid: true,
          autoHideDelay: 2000,
          toaster: 'b-toaster-bottom-center'
        })
        this.removeMasterP()

        setTimeout(() => {
          this.$auth.logout('local')
          this.$router.push('/login')
        }, 2000)

      } catch(err) {
        this.$bvToast.toast('There was an error changing your Master Key', {
          title: 'Error',
          variant: 'danger',
          solid: true,
          autoHideDelay: 3000,
          toaster: 'b-toaster-bottom-center'
        })
        this.isChangeMasterKeyInProgress = false
      }
    }
  }
})
</script>