const { VUE_APP_API_URL } = process.env

const fetchCredentials = (token) => {
  return this.$axios.$get(`${VUE_APP_API_URL}/cred`, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

const createCredential = (token, data) => {
  return this.$axios.$post(`${VUE_APP_API_URL}/cred`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

const updateCredential = (token, data, id) => {
  return this.$axios.$patch(`${VUE_APP_API_URL}/cred/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

const deleteCredential = (token, id) => {
  return this.$axios.$delete(`${VUE_APP_API_URL}/cred/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

export {
  fetchCredentials,
  createCredential,
  updateCredential,
  deleteCredential
}
