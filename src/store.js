import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import localforage from 'localforage'
import { Project, Timeline } from './js/Project'
import { platform } from 'os';

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: localforage,
  saveState: (key, state, storage) => Promise.resolve(storage.setItem(key, state)),
  restoreState: (key, storage) => Promise.resolve(storage.getItem(key))
})

export default new Vuex.Store({
  state: {
    loading: true,
    creation: new Project(),
    codings: {
      current: null,
      all: {},
    }
  },
  getters: {
    getProject: (state) => (id) => {
      if (id in state.codings.all) {
        return new Project().fromObject(state.codings.all[id])
      }
      return new Project()
    },
    current_question: (state) => (projectId) => {
      return state.codings.all[projectId].codingTimeline.current
    },
    getCodingTimeline: (state, getters) => (id) => {
      console.log("Storage.getCodingTimeline --> Start")
      let tmp = getters.getProject(id).codingTimeline
      console.log("Storage.getCodingTimeline --> Return")
      return tmp
    },
    getAllIrrelevantHeaders: (state, getters) => (id) => {
      return getters.getProject(id).getAllIrrelevantHeaders()
    },
    getCurrentIndex: (state, getters) => (id) => {
      console.log("Storage.getCurrentIndex")
      return getters.getCodingTimeline(id).currentIndex()
    },
  },
  mutations: {
    restoreTimeline(state, payload) {
      if (state.codings.all[payload]) {
        if (!state.codings.all[payload].codingTimeline instanceof Timeline) {
          state.codings.all[payload].codingTimeline = new Timeline().fromObject(state.codings.all[payload].codingTimeline)
        }
      }
    },
    setCodingTimeline(state, payload) {
      state.codings.all[payload.id].codingTimeline = payload.value
    },
    setProject(state, payload) {
      state.codings.all[payload.id] = payload.value
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
    },
    setRelevantHeaders(state, selection) {
      state.creation.relevant_headers = selection
      state.creation.steps.second = true
      state.creation.active = "third"
      state.creation.setQuestions(selection)
    },
    addQuestion(state, payload) {
      state.creation.question[payload.header].push({ 'show': payload.show, 'ask': payload.ask })
    },
    setDone(state, payload) {
      state.creation.steps[payload.id] = true
      if (payload.index) {
        state.creation.active = payload.index
      }
    },
    finishCreation(state) {
      state.codings.current = Object.assign({}, state.creation).id
      state.codings.all[state.codings.current] = Object.assign({}, state.creation);
      state.codings.all[state.codings.current].codingTimeline = state.codings.all[state.codings.current].codingTimeline.filter(function (entry) {
        return entry.coding_questions.length > 0
      })
      let p = new Project()
      state.creation = p
    },
    setIdentifier(state, payload) {
      state.creation.id = payload
    }
  },
  actions: {
    finish(state) {
      return state.question;
    },
    code_next(state, payload) {
      console.log("Storage.code_next")
      state.commit("setCodingTimeline", { id: payload.id, value: state.getters.getCodingTimeline(payload.id).moveForwards(payload.value) })
    },
    code_previous(state, payload) {
      console.log("Storage.code_previous")
      state.commit("setCodingTimeline", { id: payload.id, value: state.getters.getCodingTimeline(payload.id).moveBackwards(payload.value) })
    },
    setCurrentIndex(state, payload) {
      console.log("Storage.setCurrentIndex -> Start")
      let timeline = state.getters.getCodingTimeline(payload.id)
      timeline.setCurrentIndex(payload.index)
      state.commit("setCodingTimeline", { id: payload.id, value: timeline })
      console.log("Storage.setCurrentIndex -> End")
    },
    setAtIndex(state, payload) {
      console.log(payload)
      let timeline = state.getters.getCodingTimeline(payload.id)
      timeline[payload.index] = payload.value
      state.commit("setCodingTimeline", { id: payload.id, value: timeline })
    }
  },
  plugins: [vuexLocal.plugin],
})

