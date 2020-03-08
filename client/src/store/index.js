import Vue from 'vue'
import Vuex from 'vuex'

import parking from './modules/parking.js';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    parking,
  }
})
