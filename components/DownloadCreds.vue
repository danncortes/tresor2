<template>
  <div>
    <VerifyPasswordForm
      callToActionText="Download credentials"
      @passwordVerified="generateFileToDownload"
    />
    <a class="d-none" ref="downloadLink">Download</a>
  </div>
</template>

<script>
import Vue from 'vue'
import MasterP from '@/mixins/MasterP'
import { decryptDataObj, cryptDataObj } from '@/utils/cryptDecrypt'
import { BButton, BForm, BFormInput, BFormGroup } from 'bootstrap-vue'
import VerifyPasswordForm from '@/components/VerifyPasswordForm.vue'

export default Vue.extend({
  mixins: [MasterP],
  components: {
    VerifyPasswordForm
  },
  props: {
    credentials: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
      csvContent: 'data:text/csv;charset=utf-8,'
    }
  },
  methods: {
    async getDecriptedCredentials() {
      return this.credentials.map(cred => {
        return {
          data: [...decryptDataObj(cred.data, this.masterp)],
          name: cred.name
        }
      })
    },
    async generateFileToDownload() {
      const decriptedCredentials = await this.getDecriptedCredentials()
      // Create data string
      const creds = decriptedCredentials.map(cred => {
        const data = cred.data.map(item => {
          return `${item.fieldName}: ${item.data},`
        }).join(' ')
        return `name: ${cred.name}, ${data}`
      }).join('\n')
      this.csvContent = `${this.csvContent}${creds}`;
      const data = encodeURI(this.csvContent);
      this.$refs.downloadLink.setAttribute('href', data)
      this.$refs.downloadLink.setAttribute("download", "export.csv");
      this.$refs.downloadLink.click()
    }
  }
})
</script>
