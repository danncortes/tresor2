export default {
  data() {
    return {
      masterp: this.$cookies.get('masterp')
    }
  },
  methods: {
    removeMasterP() {
      this.$cookies.remove('masterp')
      this.masterp = null
    }
  }
}
