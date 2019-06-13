<template>
  <div>
    <md-steppers md-sync-route md-dynamic-height md-linear>
      <md-step id="first" to="/create/" exact md-label="Import Data" :md-editable="false" :md-done.sync="first">
        <FileUpload></FileUpload>
        <md-button class="md-raised md-primary" @click="setDone('first', 'second')">Continue</md-button>
      </md-step>

      <md-step id="second" to="/create/select" md-label="Second Step" :md-editable="false" :md-done.sync="second">
        <md-content>
          <h1> Here should appear the table </h1>
        <jsontable v-bind:tablepath="table" v-bind:header="header"></jsontable>
        </md-content>
      </md-step>

      <md-step id="third" to="/create/components/steppers/third" md-label="Third Step">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet quaerat modi cumque quos sed, temporibus nemo eius amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore placeat nulla.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet quaerat modi cumque quos sed, temporibus nemo eius amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore placeat nulla.</p>
      </md-step>
    </md-steppers>
    <div>
      <p> Steps: {{ steps }} </p>
      <p> First: {{ first }} </p>
      <p> Table: {{ table }} </p>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import FileUpload from '../components/FileUpload.vue'
import jsontable from '../components/JSONTable.vue'
export default {
  name: 'CreationWizard',
  components: {FileUpload,jsontable},
  methods: {
    setDone(id, index){
      this[id] = true
      if (index){
        this.active = index
      }
    }
  },
  computed: {
    table: function (){
      return this.$store.state.creation.table
    },
    header: function (){
      return this.$store.state.creation.header
    },
    steps: {
      get: function (){
        return this.$store.state.creation.steps
      },
      set: function (newValue) {
        this.$store.state.creation.steps = newValue
      }
    },
    first: {
      get: function (){
        return this.steps.first
      },
      set: function (newValue){
        this.steps.first = newValue
      },
    },
    second: function () {
      return this.steps.second
    },
    active: {
      get: function (){
        return this.$store.state.creation.active
      },
      set: function (newValue){
        return this.$store.state.creation.active
      }
    },
    ...mapState(['creation'])
  }
}
</script>