import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    table: {
      content:null,
      header:null
    }
  },
  mutations: {
    setTableContent(state, content) {
      state.table.content = content
    },
    setTableHeaders(state, header){
      state.table.header = header
    }
  },
  actions: {

  }
})
