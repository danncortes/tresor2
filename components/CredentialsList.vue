<template>
  <div class="credential-list">
    <b-container class="credential-list__header mb-2 p-0" fluid>
      <b-row no-gutters>
        <b-col cols="7" sm="9" class=" pl-2 pr-3">Name</b-col>
        <b-col cols="4" sm="2">Updated</b-col>
        <b-col cols="1" class="text-center">
          <font-awesome-icon :icon="['fas', 'angle-left']" />
        </b-col>
      </b-row>
    </b-container>
    <CredentialListItem
      v-for="(credential, index) in localCredentials"
      :key="index"
      :credential="credential"
      @onClickCredential="() => toggleCred(index)"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import { cloneDeep } from 'lodash'
import { BContainer, BRow, BCol } from 'bootstrap-vue'
import CredentialListItem from '@/components/CredentialListItem'

export default Vue.extend({
  components: {
    CredentialListItem,
    BContainer,
    BRow,
    BCol
  },
  props: {
    credentials: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      localCredentials: []
    }
  },
  watch: {
    credentials(newValue) {
      newValue && this.buildLocalCredentials()
    }
  },
  created() {
    this.buildLocalCredentials()
  },
  methods: {
    buildLocalCredentials() {
      const newCredentials = cloneDeep(this.credentials)
      this.localCredentials = newCredentials.map((cred) => ({
        ...cred,
        open: false
      }))
    },
    toggleCred(index) {
      const newCredentials = cloneDeep(this.localCredentials)
      this.localCredentials = newCredentials.map((cred, indx) => {
        if (index === indx) {
          cred.open = !cred.open
        }
        return cred
      })
    }
  }
})
</script>

<style lang="scss">
.credential-list {
  &__header {
    font-size: 14px;
  }
}
</style>
