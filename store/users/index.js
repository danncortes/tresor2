import {
  defaultUserState,
  defaultLoginState,
  defaultSignUpState
} from './defaultState'
import actions from './actions'
import mutations from './mutations'

export const state = () => ({
  user: {
    ...defaultUserState
  },
  login: {
    ...defaultLoginState
  },
  signUp: {
    ...defaultSignUpState
  }
})

export { actions, mutations }
