export default {
  async getCredentials({ commit }) {
    commit('setErrorCredentials', false)
    commit('setLoadingCredentials', true)
    try {
      const credentials = await this.$axios.$get('credential')
      commit('getCredentials', credentials)
      commit('setErrorCredentials', false)
    } catch (err) {
      commit('setErrorCredentials', 'Error Loading Credentials')
      throw err
    } finally {
      commit('setLoadingCredentials', false)
    }
  },
  async createCredential({ commit }, credential) {
    commit('setCredentialStatus', { error: false, loading: true })
    try {
      const newCredential = await this.$axios.$post('credential', credential)
      commit('createCredential', newCredential)
      commit('setCredentialStatus', { error: false })
      return newCredential
    } catch (err) {
      commit('setCredentialStatus', { error: true })
      throw err
    } finally {
      commit('setCredentialStatus', { loading: false })
    }
  },
  async updateCredential({ commit }, { credential, id }) {
    commit('setCredentialStatus', { id, error: false, loading: true })
    try {
      const updatedCredential = await this.$axios.$patch(
        `credential/${id}`,
        credential
      )
      commit('updateCredential', updatedCredential)
      commit('setCredentialStatus', { id, error: false })
      return updatedCredential
    } catch (err) {
      commit('setCredentialStatus', { id, error: true })
      throw err
    } finally {
      commit('removeCredentialStatus', id)
    }
  },
  async deleteCredential({ commit }, id) {
    commit('setCredentialStatus', { id, error: false, loading: true })
    try {
      await this.$axios.$delete(`credential/${id}`)
      commit('deleteCredential', id)
      commit('setCredentialStatus', { id, error: false })
    } catch (err) {
      commit('setCredentialStatus', { id, error: true })
      throw err
    } finally {
      commit('setCredentialStatus', { id, loading: false })
      setTimeout(() => {
        commit('removeCredentialStatus', id)
      }, 3000)
    }
  }
}
