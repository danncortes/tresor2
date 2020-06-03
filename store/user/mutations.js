import {
  defaultUserState,
  defaultLoginState,
  defaultSignUpState
} from './defaultState'

export default {
  setUser(state, { user, token }) {
    state.user = {
      ...state.user,
      ...user,
      isAuth: true,
      token
    }
  },
  removeUser(state) {
    state.user = defaultUserState
    state.login = defaultLoginState
    state.signUp = defaultSignUpState
  },
  setLoadingLogin(state, payload) {
    state.login = {
      ...state.login,
      loading: payload
    }
  },
  setErrorLogin(state, payload) {
    state.login = {
      ...state.login,
      error: payload
    }
  },
  setLoadingSignup(state, payload) {
    state.signUp = {
      ...state.signUp,
      loading: payload
    }
  },
  setErrorSignup(state, payload) {
    state.signUp = {
      ...state.signUp,
      error: payload
    }
  }
}
