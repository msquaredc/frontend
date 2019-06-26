import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import localforage from 'localforage'
import {Project,Timeline} from './js/Project'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: localforage,
  saveState: (key, state, storage) => Promise.resolve(storage.setItem(key, state)),
  restoreState: (key, storage) => Promise.resolve(storage.getItem(key))
})

export default new Vuex.Store({
  state: {
    creation: new Project(),
    codings:{
      current:null,
      all:{},
    }
  },
  mutations: {
    restoreTimeline(state,payload){
      if (state.codings.all[payload]){
        if (!state.codings.all[payload].codingTimeline instanceof Timeline){
          state.codings.all[payload].codingTimeline = new Timeline().fromObject(state.codings.all[payload].codingTimeline)
        }
      }
    },
    code_next(state,payload){
      state.codings.all[payload.id].codingTimeline = new Timeline().fromObject(state.codings.all[payload.id].codingTimeline).moveForwards(payload.value);
    },
    code_previous(state,payload){
      state.codings.all[payload.id].codingTimeline = new Timeline().fromObject(state.codings.all[payload.id].codingTimeline).moveBackwards(payload.value);
    },
    setCurrentTable(state, payload) {
      state.creation.table.content = payload.content
      state.creation.table.header = payload.header
      state.creation.steps.first = true
      payload.header.forEach(element => {
        state.creation.question[element] = []
        state.creation.answer[element] = []
      });
      state.creation.active = "second"
      console.log("New Table set.")
    },
    setRelevantHeaders(state, selection){
      state.creation.relevant_headers = selection
      state.creation.steps.second = true
      state.creation.active = "third"
      state.creation.setQuestions(selection)
    },
    addQuestion(state, payload){
      state.creation.question[payload.header].push({'show':payload.show, 'ask':payload.ask})
    },
    getQuestions(state, payload){
      
    },
    setDone(state, payload){
      state.creation.steps[payload.id] = true
      if (payload.index){
        state.creation.active = payload.index
      }
    },
    finishCreation(state){
      state.codings.current = Object.assign({}, state.creation).id
      console.log(state.codings.current)
      console.log(state.creation.id)
      state.codings.all[state.codings.current] = Object.assign({}, state.creation);
      let p = new Project()
      state.creation = p
    },
    setIdentifier(state,payload){
      console.log(payload)
      state.creation.id = payload
    }
  },
  actions: {
    finish(state){
      return state.question;
    },
  },
  plugins: [vuexLocal.plugin],
})

