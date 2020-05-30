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
  },
  add(state, text) {
    console.log('add -> state', state)
    state.user = { ...state.user, name: 'daniel' }
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  }
}
