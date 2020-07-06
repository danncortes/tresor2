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
    <div v-else-if="credentials.list.length === 0" class="text-center">
      <b-alert v-b-toggle.new-credential show
        >You don't have credentials, create one!</b-alert
      >
    </div>
    <div v-else>
      <SeachFilter
        v-if="credentials.list.length > 5"
        class="mb-4"
        @onSearchFilterChange="onSearchFilterChange"
      />
      <CredentialsList :credentials="credentialList" />
      <b-alert
        v-if="credentialsFilteredFor.length > 2 && credentialList.length === 0"
        v-b-toggle.new-credential
        variant="warning"
        show
      >
        There are no credentials that match with the search
      </b-alert>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { BCollapse, VBToggle, BButton, BSpinner } from 'bootstrap-vue'
import CredentialsList from '@/components/CredentialsList.vue'
import CreateCredential from '@/components/CreateCredential.vue'
import SeachFilter from '@/components/SearchFilter.vue'

export default Vue.extend({
  components: {
    CredentialsList,
    CreateCredential,
    BButton,
    BCollapse,
    BSpinner,
    SeachFilter
  },
  directives: {
    'b-toggle': VBToggle
  },
  middleware: ['auth', 'masterp', 'isVerified'],
  data() {
    return {
      openNewCredential: false,
      credentialsFilteredFor: ''
    }
  },
  computed: {
    ...mapGetters('credentials', ['credentials']),
    credentialList() {
      if (this.credentialsFilteredFor.length > 2) {
        return this.credentials.list.filter((cred) => {
          const name = cred.name.toLowerCase()
          return name.includes(this.credentialsFilteredFor.toLowerCase())
        })
      } else {
        return this.credentials.list
      }
    }
  },
  mounted() {
    this.getCredentials()
  },
  methods: {
    ...mapActions('credentials', ['getCredentials']),
    reloadView() {
      window.location.reload()
    },
    onSearchFilterChange(value) {
      this.credentialsFilteredFor = value
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
