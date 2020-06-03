<template>
  <div>
    Dashboard
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  middleware: ['masterp', 'isVerified'],
  created() {
    // console.log('created -> this.$cookies', this.$cookies)
  }
})
</script>

<style lang="sass"></style>
