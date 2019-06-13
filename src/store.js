import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import localforage from 'localforage'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: localforage,
  saveState: (key, state, storage) => Promise.resolve(storage.setItem(key, state)),
  restoreState: (key, storage) => Promise.resolve(storage.getItem(key))
})

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
      relevant_headers: [],
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
  },
  plugins: [vuexLocal.plugin],
})
