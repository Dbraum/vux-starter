import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import vux from './modules/vux'

Vue.use(Vuex)
const state = {
  isLoading: false,
  direction: 'forward'
}
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  state,
  getters,
  modules: {
    vux
  },
  strict: debug,
  mutations: {
    UPDATE_LOADING (state, status) {
      state.isLoading = status
    },
    UPDATE_DIRECTION (state, direction) {
      state.direction = direction
    }
  }
})
