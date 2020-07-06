<template>
  <b-form-input
    v-model="value"
    placeholder="Search credentials"
    type="search"
  ></b-form-input>
</template>

<script lang="ts">
import Vue from 'vue'
import { BFormInput } from 'bootstrap-vue'
export default Vue.extend({
  components: {
    BFormInput
  },
  data() {
    return {
      value: ''
    }
  },
  watch: {
    value(newValue) {
      this.$emit('onSearchFilterChange', newValue)
    }
  }
})
</script>
