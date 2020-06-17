<template>
  <div class="credential-detail d-flex justify-content-center">
    <div
      v-if="masterpError"
      class="d-flex justify-content-center credential-detail__error"
    >
      <b-alert show variant="danger text-center"
        >There was an error decripting this credential</b-alert
      >
    </div>
    <div else>
      <CredentialField
        v-for="(field, key) in credentialDetailArray"
        :key="key"
        :field="field"
        :index="key"
        @onToggleShowPass="onToggleShowPass"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { BAlert } from 'bootstrap-vue'
import { decryptDataObj, cryptDataObj } from '@/utils/cryptDecrypt'
import CredentialField from '@/components/CredentialField/CredentialField.vue'
import MasterP from '@/mixins/MasterP'

export default Vue.extend({
  components: {
    CredentialField,
    BAlert
  },
  mixins: [MasterP],
  props: {
    open: {
      required: true,
      type: Boolean
    },
    data: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      credentialDetail: {},
      credentialDetailArray: [],
      masterpError: false
    }
  },
  created() {
    try {
      this.credentialDetail = decryptDataObj(this.data, this.masterp)
      const newCredentialDetail = this.credentialDetail.map((cred) => {
        if (cred.type === 'userName' || cred.type === 'password') {
          return {
            ...cred,
            show: false
          }
        }
        return cred
      })
      this.credentialDetailArray = [...newCredentialDetail]
    } catch (err) {
      this.masterpError = true
    }
  },
  beforeDestroy() {
    this.credentialDetail = cryptDataObj(this.credentialDetail, this.masterp)
  },
  methods: {
    onToggleShowPass(index) {
      const newCreds = [...this.credentialDetailArray]
      newCreds[index].show = !newCreds[index].show
      this.credentialDetailArray = [...newCreds]
    }
  }
})
</script>
