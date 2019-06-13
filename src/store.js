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
        header:null,
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
    setCurrentTable(state, payload) {
      state.creation.table.content = payload.content
      state.creation.table.header = payload.header
      state.creation.steps.first = true
      state.creation.active = "second"
      console.log("New Table set.")
    },
    setRelevantHeaders(state, selection){
      state.creation.relevant_headers = selection
      state.creation.step = 2
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
