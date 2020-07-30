<template>
  <b-form class="reset-password-form" @submit.prevent="onSubmitChange">
    <b-form-group
      id="input-group-master-key"
      label="New Master Key"
      label-for="input-master-key-reset"
    >
      <b-form-input
        id="input-master-key-reset"
        v-model="form.masterKey"
        type="password"
        required
        placeholder="Enter your new master key"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="input-group-confirm-master-key"
      label="Confirm New Master Key"
      label-for="input-confirm-master-key"
    >
      <b-form-input
        id="input-confirm-master-key"
        v-model="form.confirmMasterKey"
        type="password"
        required
        placeholder="Confirm your new Master Key"
      ></b-form-input>
    </b-form-group>
    <b-button
      block
      type="submit"
      variant="primary"
      :disabled="processing || !masterKeyMatch"
    >
      <b-spinner v-if="processing" small label="Spinning"></b-spinner>
      <span v-else>Save</span>
    </b-button>
  </b-form>
</template>

<script>
import Vue from 'vue'
import { BButton, BForm, BFormInput, BFormGroup } from 'bootstrap-vue'
export default Vue.extend({
  components: {
    BButton,
    BForm,
    BFormInput,
    BFormGroup
  },
  props: {
    processing: {
      type: Boolean
    }
  },
  data() {
    return {
      form: {
        masterKey: '',
        confirmMasterKey: ''
      }
    }
  },
  computed: {
    masterKeyMatch() {
      return this.form.masterKey === this.form.confirmMasterKey
    }
  },
  methods: {
    onSubmitChange() {
      this.$emit('onSubmitChange', this.form)
    }
  }
})
</script>
