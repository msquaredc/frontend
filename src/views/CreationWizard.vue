<template>
  <div>
    <md-steppers md-dynamic-height md-linear :md-active-step.sync="active">
      <md-step id="first" exact md-label="Import Data" :md-editable="false" :md-done.sync="first">
        <FileUpload></FileUpload>
        <!-- <md-button class="md-raised md-primary" @click="setDone('first', 'second')">Continue</md-button> -->
      </md-step>

      <md-step id="second" md-label="Select relevant headers" :md-editable="false" :md-done.sync="second">
        <md-content>
          <span class=md-headline>
            Select the questions:
          </span>
          <md-checkbox v-model="questions" v-for="title in heading" :value="title" :key="title.key"> {{title}} </md-checkbox>
          <md-button class="md-raised md-primary" @click="setDone('second', 'third')">Confirm selection</md-button>
        <jsontable :table="table" :header="heading"></jsontable>
        </md-content>
        
      </md-step>

      <md-step id="third" to="/create/components/steppers/third" md-label="Third Step">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet quaerat modi cumque quos sed, temporibus nemo eius amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore placeat nulla.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet quaerat modi cumque quos sed, temporibus nemo eius amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore placeat nulla.</p>
      </md-step>
    </md-steppers>
<!--     <div>
      <p> Steps: {{ steps }} </p>
      <p> First: {{ first }} </p>
      <p> Table: {{ table}} </p>
      <p> Header: {{ heading }} </p>
    </div> -->
  </div>
</template>

<script>
import FileUpload from '../components/FileUpload.vue'
import jsontable from '../components/JSONTable.vue'
import invertedtable from '../components/InvertedSelectionTable.vue'
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
    second: {
      get: function (){
        return this.steps.second
      },
      set: function (newValue){
        this.steps.second = newValue
      },
    },
    active: {
      get: function (){
        return this.$store.state.creation.active
      },
      set: function (newValue){
        this.$store.state.creation.active = newValue
      }
    },
    table (){
      return this.$store.state.creation.table.content
    },
    heading (){
      return this.$store.state.creation.table.header
    },
    questions:{
      get: function (){
        return this.$store.state.creation.relevant_headers
      },
      set: function (newValue){
        this.$store.state.creation.relevant_headers = newValue
      }
    }

  }
}
</script>

<style lang="scss" scoped>
  .md-checkbox {
    display: flex;
  }
</style>
