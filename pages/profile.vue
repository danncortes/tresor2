<template>
  <div>
    <h3 class="mb-4">My profile</h3>
    <h5>Email Account</h5>
    <p>{{ $auth.user.email }}</p>
    <hr />
    <h5 class="mb-3">Master Key</h5>
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
    <b-button v-else block class="mb-2" @click="toggleMasterP">
      Reveal Master Key
    </b-button>
    <p>
      Remember, the Master Key is used to encrypt all your credentials, and it
      can not be reset or changed. <br />
      Save it in a secure place.
    </p>
    <hr />
    <h5 class="mb-3">Change Password</h5>
    <div v-if="iWantToChangeMyPass">
      <ChangePasswordForm
        :is-loading="isChangePassInProgress"
        @onSubmitChangePass="onSubmitChangePass"
      />
      <b-button
        block
        variant="default"
        class="mb-2"
        @click="toggleChangeMyPass"
      >
        Cancel
      </b-button>
    </div>
    <b-button v-else block class="mb-2" @click="toggleChangeMyPass">
      Change my password
    </b-button>
    <hr />
    <h5 class="mb-3">Download my credentials</h5>
    <div v-if="isDownloadCredActive">
      <DownloadCreds class="mb-2" />
      <b-button variant="default" block class="mb-2" @click="() => { isDownloadCredActive = false }">
        Cancel
      </b-button>
    </div>
    <div v-else>
      <p>Get all your credentials in a .csv file</p>
      <div class="d-flex">
        <b-button block class="mb-2" @click="() => { isDownloadCredActive = true }">
          Download
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import MasterP from '@/mixins/MasterP'
import ChangePasswordForm from '@/components/ChangePasswordForm.vue'
import DownloadCreds from '@/components/DownloadCreds.vue'
export default Vue.extend({
  components: {
    ChangePasswordForm,
    DownloadCreds
  },
  middleware: ['auth', 'masterp', 'isVerified'],
  mixins: [MasterP],
  data() {
    return {
      showMasterP: false,
      isChangePassInProgress: false,
      iWantToChangeMyPass: false,
      isDownloadCredActive: false
    }
  },
  methods: {
    toggleMasterP() {
      this.showMasterP = !this.showMasterP
    },
    toggleChangeMyPass() {
      this.iWantToChangeMyPass = !this.iWantToChangeMyPass
    },
    async onSubmitChangePass(form) {
      this.isChangePassInProgress = true
      try {
        await this.$axios.$post('password/change', form)
        this.$bvToast.toast('Your Password was changed successfully', {
          title: 'Done!',
          variant: 'success',
          solid: true,
          autoHideDelay: 2000,
          toaster: 'b-toaster-bottom-center'
        })
        this.iWantToChangeMyPass = false
        setTimeout(() => {
          this.$auth.logout('local')
          this.$router.push('/login')
        }, 2000)
      } catch (err) {
        this.$bvToast.toast('There was an error changing your password', {
          title: 'Error',
          variant: 'danger',
          solid: true,
          autoHideDelay: 3000,
          toaster: 'b-toaster-bottom-center'
        })
      } finally {
        this.isChangePassInProgress = false
      }
    }
  }
})
</script>
