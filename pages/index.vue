<template>
  <div class="layout-in dashboard px-3 py-3">
    <b-container class="title-area mb-3">
      <b-row align-h="between" align-v="center" no-gutters>
        <b-col cols="auto">
          <h4 v-if="openNewCredential" class="title mb-0">New Credential</h4>
          <h4 v-else class="title">Credentials</h4>
        </b-col>
        <b-col cols="auto">
          <b-button
            v-if="openNewCredential"
            v-b-toggle.new-credential
            size="sm"
          >
            <font-awesome-icon :icon="['fas', 'times']" /> Cancel
          </b-button>
          <b-button
            v-else
            v-b-toggle.new-credential
            variant="primary"
            size="sm"
          >
            <font-awesome-icon :icon="['fas', 'plus']" /> New
          </b-button>
        </b-col>
      </b-row>
    </b-container>

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
    <div v-if="credentials.status.loading">
      Loading...
    </div>
    <div v-else-if="credentials.status.error">
      {{ credentials.status }}
    </div>
    <div v-else>
      <CredentialsList :credentials="credentials.list" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import {
  BCollapse,
  VBToggle,
  BContainer,
  BRow,
  BCol,
  BButton
} from 'bootstrap-vue'
import CredentialsList from '@/components/CredentialsList.vue'
import CreateCredential from '@/components/CreateCredential.vue'

export default Vue.extend({
  components: {
    CredentialsList,
    CreateCredential,
    BContainer,
    BRow,
    BCol,
    BButton,
    BCollapse
  },
  directives: {
    'b-toggle': VBToggle
  },
  middleware: ['masterp', 'isVerified'],
  computed: {
    ...mapGetters('credentials', ['credentials'])
  },
  data() {
    return {
      openNewCredential: false
    }
  },
  created() {
    this.getCredentials()
  },
  methods: {
    ...mapActions('credentials', ['getCredentials'])
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
