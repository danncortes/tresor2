<template>
  <div class="credential-list-item">
    <div class="credential-list-item__bar py-3" @click="onClickCredential">
      <b-container class="bv-example-row p-0" fluid>
        <b-row no-gutters>
          <b-col cols="7" sm="9" class=" pl-2 pr-3">{{
            credential.name
          }}</b-col>
          <b-col cols="4" sm="2" class="credential-list-item__updated-at">{{
            credential.updatedAt
              | format({ format: 'DD.MM.YY HH:mm', dayjs: this.$dayjs })
          }}</b-col>
          <b-col cols="1" class="text-center">
            <font-awesome-icon
              v-if="credential.open"
              :icon="['fas', 'angle-down']"
            />
            <font-awesome-icon v-else :icon="['fas', 'angle-left']" />
          </b-col>
        </b-row>
      </b-container>
    </div>
    <b-collapse v-model="visible">
      <div class="credential-list-item__collapsable-area">
        <!-- Form Edit -->
        <b-form v-if="isEdit" @submit.prevent="saveUpdatedCredential">
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
        <CredentialDetail
          v-else-if="credential.open"
          class="credential-list-item__detail pb-3"
          :open="credential.open"
          :data="credential.data"
        />
        <b-container
          v-if="credential.open && !isEdit"
          class="credential-list-item__controls pb-4"
        >
          <b-row align-h="between" align-v="center">
            <b-col cols="auto">
              <div>
                <div v-if="confirmDelete" class="flex">
                  <b-button
                    class="mr-2"
                    variant="default"
                    size="sm"
                    @click="onClickCancelDelete"
                  >
                    Cancel
                  </b-button>
                  <b-button
                    variant="danger"
                    size="sm"
                    :disabled="processing"
                    @click="onClickConfirmDelete"
                  >
                    <span v-if="processing">
                      <b-spinner small label="Spinning"></b-spinner>
                      Deleting...
                    </span>
                    <span v-else>
                      Confirm delete!
                    </span>
                  </b-button>
                </div>
                <div v-else>
                  <b-button
                    class=""
                    variant="danger"
                    size="sm"
                    :disabled="processing"
                    @click="onClickDelete"
                  >
                    <font-awesome-icon :icon="['fas', 'trash-alt']" />
                  </b-button>
                </div>
              </div>
            </b-col>
            <b-col cols="auto">
              <b-button
                class=""
                variant="primary"
                size="sm"
                @click="onClickEdit"
              >
                <font-awesome-icon :icon="['fas', 'pencil-alt']" />
                Edit
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import {
  BCollapse,
  VBToggle,
  BContainer,
  BRow,
  BCol,
  BButton,
  BForm,
  BSpinner
} from 'bootstrap-vue'

import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { decryptDataObj, cryptDataObj } from '@/utils/cryptDecrypt'
import CredentialDetail from '@/components/CredentialDetail/CredentialDetail.vue'
import CredentialForm from '@/components/CredentialForm.vue'
import CredentialFormMixin from '@/mixins/CredentialFormMixin'
import MasterP from '@/mixins/MasterP'

export default Vue.extend({
  directives: {
    'b-toggle': VBToggle
  },
  components: {
    BCollapse,
    BContainer,
    BRow,
    BCol,
    CredentialDetail,
    BButton,
    BForm,
    CredentialForm,
    BSpinner
  },
  mixins: [CredentialFormMixin, MasterP],
  props: {
    credential: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      isEdit: false,
      newCredential: {},
      visible: false,
      decrypted: false,
      confirmDelete: false
    }
  },
  computed: {
    ...mapGetters('credentials', ['credentials']),
    processing() {
      return Object.keys(this.credentials.status).includes(
        `${this.credential._id}`
      )
      // return this.credential._id === this.credentialState.credentialStatus.id
    }
  },
  watch: {
    isEdit(newValue) {
      if (newValue) {
        this.newCredential = this.buildNewCredential(this.credential)
      }
    },
    credential() {
      this.$nextTick(() => {
        this.visible = this.credential.open
      })
    },
    visible(newValue) {
      if (newValue === false) {
        this.isEdit = false
      }
    }
  },
  methods: {
    ...mapActions('credentials', ['updateCredential', 'deleteCredential']),
    cancel() {
      this.isEdit = false
    },
    onClickCredential() {
      this.$emit('onClickCredential')
    },
    onClickEdit() {
      this.isEdit = true
    },
    buildNewCredential(credential) {
      const credentialCopy = cloneDeep(credential)
      credentialCopy.data = decryptDataObj(credentialCopy.data, this.masterp)
      const newCred = {
        id: credentialCopy._id,
        name: credentialCopy.name,
        fields: credentialCopy.data.map((field) => ({
          ...field,
          valid: null,
          minusButton: true,
          plusButton: false
        }))
      }
      newCred.fields[newCred.fields.length - 1].plusButton = true

      if (newCred.fields.length === 1) {
        newCred.fields[0].minusButton = false
      }
      return newCred
    },
    saveUpdatedCredential() {
      const credential = {
        name: this.newCredential.name,
        data: cryptDataObj(this.cleanFields(), this.masterp)
      }

      // Create credential
      this.updateCredential({ credential, id: this.newCredential.id })
    },
    onClickDelete() {
      this.confirmDelete = true
    },
    onClickCancelDelete() {
      this.confirmDelete = false
    },
    async onClickConfirmDelete() {
      await this.deleteCredential(this.credential._id)
      this.confirmDelete = false
    }
  }
})
</script>

<style lang="scss">
.credential-list-item {
  &__bar {
    border-top: 1px solid #e5e5e5;
    cursor: pointer;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  &__updated-at,
  &__created-at {
    font-size: 0.7rem;
    //color: #777;
    font-weight: 600;
    line-height: 1.5rem;
  }
}
</style>
