<template>
  <b-form-select
    v-model="selected"
    size="sm"
    :options="options"
    @change="onSelectTypeChange"
  ></b-form-select>
</template>

<script>
import Vue from 'vue'
import { BFormSelect } from 'bootstrap-vue'
import { types } from '@/constants'

export default Vue.extend({
  components: {
    BFormSelect
  },
  props: {
    value: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      selected: this.value,
      options: []
    }
  },
  created() {
    this.options = types.map((type) => ({
      value: type.value,
      text: type.label
    }))
  },
  methods: {
    onSelectTypeChange() {
      this.$emit('onSelectTypeChange', this.selected)
    }
  }
})
</script>
