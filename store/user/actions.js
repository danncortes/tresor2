import store2 from 'store2'

import {
  loginUser,
  fetchUser,
  signupUser,
  logoutUser
} from '@/services/user-service'

import { getToken, removeToken } from '@/helpers/token'

export default {
  async fetchUser({ commit }, token) {
    const user = await fetchUser(token)
    commit('setUser', { user: user.data, token })
  },
  async loginUser({ commit }, form) {
    commit('setErrorLogin', false)
    commit('setLoadingLogin', true)
    try {
      const user = await loginUser(form)
      commit('setUser', user.data)
      if (process.browser) {
        sessionStorage.setItem('tresor', JSON.stringify(user.data))
      }
      store2('masterp', form.masterp)
      commit('setErrorLogin', false)
    } catch (err) {
      commit('setErrorLogin', 'Error Login In')
      throw err
    } finally {
      commit('setLoadingLogin', false)
    }
  },
  async logoutUser({ commit }) {
    const token = getToken()
    await logoutUser(token)
    removeToken()
    commit('removeUser')
  }
}
