import { createStore } from 'vuex'
import auth from './auth'
import info from './info'
import records from './records'
import leftOvers from './leftOvers'

export default createStore({
  state: {
    error: null
  },
  mutations: {
    setError (state, error) {
      state.error = error
    },
    clearError (state) {
      state.error = null
    }
  },
  getters: {
    error: s => s.error
  },
  actions: {
  },
  modules: {
    auth,
    info,
    records,
    leftOvers
  }
})
