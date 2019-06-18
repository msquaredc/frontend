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
        third: false,
      },
      table: {
        content:null,
        header:null,
      },
      relevant_headers: [],
      question: {},
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
      selection.forEach(element => {
        state.creation.question[element] = []
      });
      state.creation.steps.second = true
      state.creation.active = "third"
    },
    addQuestion(state, payload){
      state.creation.question[payload.header].push({'show':payload.show, 'ask':payload.ask})
    },
    getQuestions(state, payload){

    }
  },
  actions: {
    finish(state){
      return state.question;
    }
  },
  plugins: [vuexLocal.plugin],
})
