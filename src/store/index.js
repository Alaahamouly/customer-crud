import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userToken: null
  },
  getters: {
    userToken: (state) => {
      return state.userToken
    }
  },
  mutations: {
    userToken (state, userToken) {
      state.userToken = userToken
    }
  },
  actions: {
    userToken (context, userToken) {
      context.commit('userToken', userToken)
    }
  },
  modules: {}
})
