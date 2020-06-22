<template>
  <div class="create-credential">
    <b-form @submit.prevent="saveCredential">
      <CredentialForm
        :credential="newCredential"
        :processing="processing"
        @cancel="cancel"
        @addField="addField"
        @removeField="
          (index) => {
            removeField(index)
          }
        "
        @onChangeFieldName="
          (value, index) => {
            updateFieldName(value, index)
          }
        "
        @onChangeData="
          (value, index) => {
            updateData(value, index)
          }
        "
        @onSelectTypeChange="
          (value, index) => {
            updateType(value, index)
          }
        "
      />
    </b-form>
    <h4 class="create-credential__title-backup ml-3 mb-3">Credentials</h4>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { BForm } from 'bootstrap-vue'
import { cryptDataObj } from '@/utils/cryptDecrypt'
import { userName, password } from '@/constants/fieldsTemplate'
import CredentialForm from '@/components/CredentialForm.vue'
import CredentialFormMixin from '@/mixins/CredentialFormMixin'
import MasterP from '@/mixins/MasterP'

export default Vue.extend({
  components: {
    BForm,
    CredentialForm
  },
  mixins: [CredentialFormMixin, MasterP],
  data() {
    return {
      newCredential: {
        name: '',
        fields: [
          {
            ...userName,
            valid: null,
            minusButton: true,
            plusButton: false
          },
          {
            ...password,
            valid: null,
            minusButton: true,
            plusButton: true
          }
        ]
      },
      edit: true
    }
  },
  computed: {
    ...mapGetters('credentials', ['credentials']),
    processing() {
      return this.credentials.loading
    }
  },
  methods: {
    ...mapActions('credentials', ['createCredential']),
    cancel() {
      this.$emit('cancelCreate')
    },
    async saveCredential() {
      const credential = {
        name: this.newCredential.name,
        data: cryptDataObj(this.cleanFields(), this.masterp)
      }
      // Create credential
      await this.createCredential(credential)
      // Collapse create credential
      this.$emit('onCredCreated')
    }
  }
})
</script>
