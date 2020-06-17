<template>
  <div class="layout-in dashboard">
    <div class="title-area mb-3 d-flex justify-content-between">
      <div cols="auto">
        <h4 v-if="openNewCredential" class="title mb-0">New Credential</h4>
        <h4 v-else class="title">Credentials</h4>
      </div>
      <div cols="auto">
        <b-button v-if="openNewCredential" v-b-toggle.new-credential size="sm">
          <font-awesome-icon :icon="['fas', 'times']" /> Cancel
        </b-button>
        <b-button v-else v-b-toggle.new-credential variant="primary" size="sm">
          <font-awesome-icon :icon="['fas', 'plus']" /> New
        </b-button>
      </div>
    </div>

    <!-- New Credential -->
    <b-collapse id="new-credential" v-model="openNewCredential">
      <div class="dashboard__create-cred-container">
        <transition name="fadeCred">
          <CreateCredential
            v-if="openNewCredential"
            @onCredCreated="
              () => {
                openNewCredential = false
              }
            "
            @cancelCreate="
              () => {
                openNewCredential = false
              }
            "
          />
        </transition>
      </div>
    </b-collapse>
    <div v-if="credentials.loading" class="d-flex justify-content-center pt-3">
      <b-spinner medium label="Spinning" variant="primary"></b-spinner>
    </div>
    <div v-else-if="credentials.error">
      <p class="text-center">{{ credentials.error }}</p>
      <div class="d-flex justify-content-center">
        <b-button variant="primary" size="sm" @click="reloadView">
          <font-awesome-icon :icon="['fas', 'sync']" /> Reload
        </b-button>
      </div>
    </div>
    <CredentialsList v-else :credentials="credentials.list" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { BCollapse, VBToggle, BButton, BSpinner } from 'bootstrap-vue'
import CredentialsList from '@/components/CredentialsList.vue'
import CreateCredential from '@/components/CreateCredential.vue'

export default Vue.extend({
  components: {
    CredentialsList,
    CreateCredential,
    BButton,
    BCollapse,
    BSpinner
  },
  directives: {
    'b-toggle': VBToggle
  },
  middleware: ['masterp', 'isVerified'],
  data() {
    return {
      openNewCredential: false
    }
  },
  computed: {
    ...mapGetters('credentials', ['credentials'])
  },
  created() {
    this.getCredentials()
  },
  methods: {
    ...mapActions('credentials', ['getCredentials']),
    reloadView() {
      window.location.reload()
    }
  }
})
</script>

<style lang="scss">
.dashboard {
  .fadeCred-enter-active,
  .fadeCred-leave-active {
    transition: opacity 0.5s;
  }
  .fadeCred-enter,
  .fadeCred-leave-to {
    opacity: 0;
  }

  &__create-cred-container {
    min-height: 300px;
  }
}
</style>
