export default {
  data() {
    return {
      masterp: this.$cookies.get('masterp'),
      isMasterpCopied: false
    }
  },
  methods: {
    removeMasterP() {
      this.$cookies.remove('masterp')
      this.masterp = null
    },
    onCopyMasterp() {
      // @ts-ignore
      this.$refs.masterp && this.$refs.masterp.select()
      document.execCommand('copy')
      this.isMasterpCopied = true
      setTimeout(() => {
        this.isMasterpCopied = false
      }, 2000)
    }
  }
}
