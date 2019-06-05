import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    creation:{
      active: 'first',
      steps:{
        first: false,
        second: false,
      },
      table: {
        content:null,
        header:null
      },
      relevant_headers: null,
      question: null,
    },
    codings:{
      current:null,
      all:[],
    }
  },
  mutations: {
    setCurrentTable(state, content, header) {
      state.current_table.content = content
      state.current_table.header = header
      state.creation_step = 1
    },
    setRelevantHeaders(state, selection){
      state.relevant_headers = selection
      state.creation_step = 2
    },
    addQuestion(state, header, show_element, ask_element){
      state.question[header].append({'show':show_element, 'ask':ask_element})
    }
    
  },
  actions: {
    finish(state){
      return state.question;
    }
  }
})
