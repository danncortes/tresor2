<template>
  <div>
    <b-form class="reset-password-form" @submit.prevent="onSubmitDownload">
      <b-form-group
        id="input-group-pass"
        label="Password"
        label-for="input-pass"
      >
        <b-form-input
          id="input-pass"
          v-model="form.password"
          type="password"
          required
          placeholder="Enter your password"
        ></b-form-input>
      </b-form-group>
      <b-button
        block
        type="submit"
        variant="primary"
        :disabled="isDownloadCredProcessing || isFormInvalid"
      >
        <b-spinner v-if="isDownloadCredProcessing" small label="Spinning"></b-spinner>
        <span v-else>Download Credentials</span>
      </b-button>
    </b-form>
    <a class="d-none" ref="downloadLink">Download</a>
  </div>
</template>

<script>
import Vue from 'vue'
import MasterP from '@/mixins/MasterP'
import { mapGetters, mapActions } from 'vuex'
import { decryptDataObj, cryptDataObj } from '@/utils/cryptDecrypt'
import { BButton, BForm, BFormInput, BFormGroup } from 'bootstrap-vue'
export default Vue.extend({
  mixins: [MasterP],
  components: {
    BButton,
    BForm,
    BFormInput,
    BFormGroup
  },
  data() {
    return {
      form: {
        password: ''
      },
      isDownloadCredProcessing: false,
      csvContent: 'data:text/csv;charset=utf-8,'
    }
  },
  computed: {
    ...mapGetters('credentials', ['credentials']),
    isFormInvalid() {
      return !this.form.password
    }
  },
  methods: {
    ...mapActions('credentials', ['getCredentials']),
    async getDecriptedCredentials() {
      if(this.credentials.list.length === 0) {
        await this.getCredentials()
      }
      return this.credentials.list.map(cred => {
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
    },
    async onSubmitDownload() {
      this.isDownloadCredProcessing = true
      try {
        await this.$axios.$post('credential/download', { password: this.form.password })
        await this.generateFileToDownload()
        this.form.password = ''
      } catch(err) {
        this.$bvToast.toast('There was an error downloading your credentials', {
          title: 'Error',
          variant: 'danger',
          solid: true,
          autoHideDelay: 3000,
          toaster: 'b-toaster-bottom-center'
        })
      } finally {
        this.isDownloadCredProcessing = false
      }
    }
  }
})
</script>
