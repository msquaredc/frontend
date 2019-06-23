<template>
  <div>
    <md-steppers md-dynamic-height md-linear :md-active-step.sync="active">
      <md-step id="zeroth" exact md-label="Name it" :md-editable="false" :md-done.sync="zeroth">
        <md-content>
          <span class="md-headline">
            Give your project a name
          </span>
          <md-field>
            <label> What is the name of your project?</label>
            <md-input v-model="projectIdentifier" required></md-input>
            <span class="md-error">There is an error</span>
          </md-field>
          <md-button class="md-raised md-primary" @click="setIdentifier()">Continue</md-button>
        </md-content>
      </md-step>

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
          <md-button class="md-raised md-primary" @click="setRelevantHeaders(questions)">Confirm selection</md-button>
        <jsontable :table="table" :header="heading"></jsontable>
        </md-content>
        
      </md-step>

      <md-step id="third" md-label="Add coding questions" :md-done.sync="third">
        <div class="md-layout md-gutter md-alignment-center">
          <SubquestionCreation v-for="question in questions" :question="question" :key="question.key"></SubquestionCreation>
        </div>
        <md-button class="md-raised md-primary" @click="finish()">Finish</md-button>
      </md-step>
    </md-steppers>
<!--      <div>
      <p> Steps: {{ steps }} </p>
      <p> First: {{ first }} </p>
      <p> Table: {{ table}} </p>
      <p> Header: {{ heading }} </p>
      <p> Current: {{active}}</p>
      <p> Questions: {{questions}}</p>
      <p> Identifier: {{projectIdentifier}}</p>
    </div> -->
  </div>
</template>

<script>
import FileUpload from '../components/FileUpload.vue'
import jsontable from '../components/JSONTable.vue'
import invertedtable from '../components/InvertedSelectionTable.vue'
import SubquestionCreation from '../components/SubquestionCreation.vue'
export default {
  name: 'CreationWizard',
  components: {FileUpload,jsontable,SubquestionCreation},
  methods: {
    setDone(id, index){
      this.$store.commit("setDone",{'id':id,'index':index})
    },
    setRelevantHeaders(header){
      this.$store.commit("setRelevantHeaders",header)
    },
    finish(){
      this.$store.commit("finishCreation")
      this.$router.push({path:"/"})
    },
    setIdentifier(){
      console.log(this.projectIdentifier)
      this.$store.commit("setIdentifier",this.projectIdentifier)
      this.setDone("zeroth","first")
    }
  },
  data (){
    return {
      projectIdentifier:null
    }
  },
  computed: {
    steps (){
      return this.$store.state.creation.steps
    },
    zeroth(){
      return this.$store.state.creation.steps.zeroth
    },
    first(){
      return this.$store.state.creation.steps.first
    },
    second (){
      return this.$store.state.creation.steps.second
    },
    third(){
      return this.$store.state.creation.steps.third
    },
    active(){
      return this.$store.state.creation.active
    },
    table (){
      return this.$store.state.creation.table.content
    },
    heading (){
      return this.$store.state.creation.table.header
    },
    questions (){
      return this.$store.state.creation.relevant_headers
    }
  }
}
</script>

<style lang="scss" scoped>
  .md-checkbox {
    display: flex;
  }
</style>
