<template>
  <div :class="['credential-field', { 'credential-field--edit': edit }]">
    <b-row align-h="start" align-v="end" no-gutters>
      <b-col cols="auto">
        <div :class="['credential-field__inputs', { 'd-sm-flex': edit }]">
          <div v-if="edit" role="group" class="mr-2">
            <!-- Field Name -->
            <b-input
              size="sm"
              :value="fieldName"
              type="text"
              :readonly="readonly"
              placeholder="Field Name"
              :state="fieldNameValid"
              required
              class="credential-field__input-field-name"
              @keyup="
                (e) => {
                  onChangeFieldName(e)
                }
              "
            ></b-input>
            <b-form-invalid-feedback
              id="input-live-feedback"
              class="credential-field__input-field-name-feedback"
            >
              "{{ fieldName }}" field should not be duplicated
            </b-form-invalid-feedback>
          </div>

          <!-- Label Read-->
          <label
            v-else
            class="mr-sm-2 credential-field__field-name-read"
            :for="`inline-form-input-${index}`"
          >
            {{ field.fieldName }}
          </label>

          <div class="d-flex">
            <!-- Data -->
            <b-input
              :id="`inline-form-input-${index}`"
              :ref="field.fieldName"
              size="sm"
              :value="data"
              :type="typeField"
              :readonly="readonly"
              :placeholder="`Insert ${fieldName}`"
              class="mr-2 credential-field__data-field"
              @keyup="
                (e) => {
                  onChangeData(e)
                }
              "
            ></b-input>
            <div v-if="!edit" class="credential-field__controls-read d-flex">
              <!-- Eye button Show/Hide-->
              <b-button
                v-if="showEye"
                class="credential-field__reveal-data-btn"
                variant="outline-secondary"
                size="sm"
                @click="
                  () => {
                    onClickEye(index)
                  }
                "
              >
                <font-awesome-icon v-if="!field.show" :icon="['fas', 'eye']" />
                <font-awesome-icon v-else :icon="['fas', 'eye-slash']" />
              </b-button>

              <!-- button Copy-->
              <b-button
                class="credential-field__copy-btn"
                variant="outline-primary"
                size="sm"
                @click="
                  () => {
                    onCopy(field.fieldName, index)
                  }
                "
              >
                <font-awesome-icon :icon="['fas', 'copy']" />
              </b-button>

              <!-- button Send Email-->
              <b-button
                v-if="field.type === 'email'"
                class="credential-field__email-btn"
                variant="outline-primary"
                size="sm"
                @click="
                  () => {
                    sendEmail()
                  }
                "
              >
                <font-awesome-icon :icon="['fas', 'envelope']" />
              </b-button>

              <!-- button Open Map-->
              <b-button
                v-else-if="field.type === 'address'"
                class="credential-field__address-btn"
                variant="outline-primary"
                size="sm"
                @click="
                  () => {
                    searchMap()
                  }
                "
              >
                <font-awesome-icon :icon="['fas', 'map']" />
              </b-button>

              <!-- button Open Url-->
              <b-button
                v-else-if="field.type === 'url'"
                class="credential-field__url-btn"
                variant="outline-primary"
                size="sm"
                @click="
                  () => {
                    openAddress()
                  }
                "
              >
                <font-awesome-icon :icon="['fas', 'external-link-alt']" />
              </b-button>

              <span v-if="copied">Copied!</span>
            </div>
          </div>

          <TypesSelect
            v-if="edit"
            :value="field.type"
            class="credential-field__type-select mr-2"
            @onSelectTypeChange="onSelectTypeChange"
          />
        </div>
      </b-col>

      <b-col v-if="edit" cols="auto">
        <div class="credential-field__controls-read">
          <b-button
            v-if="minusButton"
            class="credential-field__remove-btn"
            pill
            variant="outline-danger"
            size="sm"
            @click="onClickRemove"
          >
            <font-awesome-icon :icon="['fas', 'minus']" />
          </b-button>
          <b-button
            v-if="plusButton"
            class="credential-field__add-btn"
            pill
            variant="outline-success"
            size="sm"
            @click="onClickAdd"
          >
            <font-awesome-icon :icon="['fas', 'plus']" />
          </b-button>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Vue from 'vue'
import {
  BButton,
  BFormInput,
  BRow,
  BCol,
  BFormInvalidFeedback
} from 'bootstrap-vue'
import TypesSelect from '@/components/TypesSelect.vue'

export default Vue.extend({
  components: {
    BButton,
    'b-input': BFormInput,
    TypesSelect,
    BRow,
    BCol,
    BFormInvalidFeedback
  },
  props: {
    field: {
      required: true,
      type: Object
    },
    index: {
      required: true
    },
    edit: {
      type: Boolean,
      default: false
    },
    plusButton: {
      type: Boolean,
      required: false,
      default: false
    },
    minusButton: {
      type: Boolean,
      required: false,
      default: true
    },
    fieldNameValid: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      copied: false
    }
  },
  computed: {
    readonly() {
      return !this.edit
    },
    typeField() {
      if (typeof this.field.show === 'boolean') {
        return this.field.show ? 'text' : 'password'
      }
      return 'text'
    },
    fieldName() {
      return this.field.fieldName
    },
    data() {
      return this.field.data
    },
    showEye() {
      return this.field.type === 'userName' || this.field.type === 'password'
    }
  },
  methods: {
    onClickEye(index) {
      this.$emit('onToggleShowPass', index)
    },
    onCopy(el, index) {
      this.$emit('onToggleShowPass', index)
      this.$nextTick(() => {
        this.$refs[el].select()
      })
      this.$nextTick(() => {
        document.execCommand('copy')
      })
      this.$nextTick(() => {
        this.$emit('onToggleShowPass', index)
      })
      this.copied = true
      setTimeout(() => {
        this.copied = false
      }, 1000)
    },
    sendEmail() {
      window.location.href = `mailto:${this.data}`
    },
    openAddress() {
      window.open(`http://${this.data}`, '_blank')
    },
    searchMap() {
      window.open(`https://www.google.com/maps/search/${this.data}`, '_blank')
    },
    onChangeFieldName(e) {
      this.$parent.$emit('onChangeFieldName', e.target.value, this.index)
    },
    onChangeData(e) {
      this.$parent.$emit('onChangeData', e.target.value, this.index)
    },
    onSelectTypeChange(type) {
      this.$parent.$emit('onSelectTypeChange', type, this.index)
    },
    onClickRemove() {
      this.$parent.$emit('removeField', this.index)
    },
    onClickAdd() {
      this.$parent.$emit('addField')
    }
  }
})
</script>

<style lang="scss">
.credential-field {
  $p: &;
  margin-bottom: 1rem;

  &__type-select {
    width: 110px;
  }
  &__input-field-name,
  &__input-field-name-feedback {
    width: 130px;
  }

  &__data-field {
    width: 210px;
  }

  @media (max-width: 575.98px) {
    &:not(&--edit) {
      margin-bottom: 0.75rem;
    }
    &--edit {
      border-bottom: 1px dotted rgba(0, 0, 0, 0.3);
      padding-bottom: 1rem;
      #{$p}__input-field-name,
      #{$p}__input-field-name-feedback,
      #{$p}__data-field {
        margin-bottom: 8px;
      }
    }
    &__input-field-name,
    &__input-field-name-feedback,
    &__data-field,
    &__type-select {
      width: 200px;
    }
  }

  .fa-eye,
  .fa-eye-slash {
    cursor: pointer;
  }

  label {
    width: 130px;
    justify-content: initial;
  }

  button {
    margin-right: 2px;
  }

  &__form {
    align-items: flex-start;
  }
}
</style>
