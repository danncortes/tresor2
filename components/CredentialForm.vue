<template>
  <div class="credential-form">
    <div class="credential-form__box mb-4">
      <b-input
        v-model="credential.name"
        size="sm"
        placeholder="Enter a name"
        class="credential-form__credential-name ml-3 mb-3"
        required
      ></b-input>
      <CredentialField
        v-for="(field, key) in credential.fields"
        :key="key"
        :field="field"
        :index="key"
        :edit="true"
        :field-name-valid="field.valid"
        :plus-button="field.plusButton"
        :minus-button="field.minusButton"
      />
      <b-container class="credential-form__controls mt-4">
        <b-row align-h="end" align-v="start" no-gutters>
          <b-col cols="auto">
            <b-button
              class="credential-form__cancel-btn mr-2"
              variant="default"
              size="sm"
              @click="onClickCancel"
            >
              Cancel
            </b-button>
            <b-button
              variant="primary"
              size="sm"
              :disabled="processing"
              type="submit"
            >
              <span v-if="processing">
                <b-spinner small label="Spinning"></b-spinner>
                Saving...
              </span>
              <span v-else>
                <font-awesome-icon :icon="['fas', 'save']" />
                Save
              </span>
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {
  BContainer,
  BRow,
  BCol,
  BButton,
  BFormInput,
  BSpinner,
  VBToggle
} from 'bootstrap-vue'
import CredentialField from '@/components/CredentialField/CredentialField.vue'
export default Vue.extend({
  directives: {
    'b-toggle': VBToggle
  },
  components: {
    CredentialField,
    BContainer,
    BRow,
    BCol,
    BButton,
    'b-input': BFormInput,
    BSpinner
  },
  props: {
    credential: {
      required: true,
      type: Object
    },
    processing: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClickCancel() {
      this.$emit('cancel')
    }
  }
})
</script>

<style scoped lang="scss">
.credential-form {
  &__box {
    padding: 24px 10px 20px;
    background-color: #f2f2f2;
    border-radius: 3px;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.05) inset;
  }

  &__credential-name {
    width: 200px;
  }
}
</style>
