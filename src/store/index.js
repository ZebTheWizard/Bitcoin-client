import Vuex from 'vuex'

export default new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
