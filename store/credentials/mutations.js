export default {
  getCredentials(state, payload) {
    state.list = payload
  },
  createCredential(state, payload) {
    state.list = [payload, ...state.list]
  },
  updateCredential(state, payload) {
    const updatedCredentials = state.list.filter(
      (cred) => cred._id !== payload._id
    )
    state.list = [payload, ...updatedCredentials]
  },
  deleteCredential(state, payload) {
    state.list = state.list.filter((cred) => cred._id !== payload)
  },
  setLoadingCredentials(state, payload) {
    state.loading = payload
  },
  setErrorCredentials(state, payload) {
    state.error = payload
  },
  setCredentialStatus(state, { id = null, processing = false, error = false }) {
    if (id) {
      state.status = {
        ...state.status,
        [id]: {
          processing,
          error
        }
      }
    } else {
      state.status = {
        processing,
        error
      }
    }
  },
  removeCredentialStatus(state, id) {
    const newStatus = { ...state.status }
    delete newStatus[id]
    state.status = newStatus
  }
}
