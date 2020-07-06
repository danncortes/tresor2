import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export const state = () => ({
  list: [],
  loading: true,
  error: false,
  status: {}
})

export { actions, mutations, getters }
