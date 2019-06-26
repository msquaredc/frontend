<template>
<div>
  <div v-if="done">
    <p> You're done </p>
  </div>
  <div v-else>
    <div class="md-headline container6">ID:{{ id }}</div>
    <div class="md-title container6 responseblock">
      <p>" {{response}} "</p>
    </div>
    <p> All Codings: {{allCodings}}</p>
    <p> {{index}} </p> 
    <p> {{ questionsToShow }} </p>
    <!-- <p> Project : {{ project }} </p> -->
    <!-- <p v-for="entry in project" :key="entry.key">
      {{entry}}
    </p> -->
  <p> Coding questions: {{ codingQuestions }}</p>
  <p> Currentd {{project.codingTimeline.current}}
  <!-- <p> {{project.codingTimeline}}</p> -->
  
    <div v-for="codingQuestion in codingQuestions" :key = "codingQuestion.key">
      <div v-if="codingQuestion.ask.type == 'string'">
        <p> You asked for a sting </p>
      </div>
      <div v-else-if="codingQuestion.ask.type == 'boolean'">
        <md-checkbox v-model="codingQuestion.ask.model">{{codingQuestion.show }}</md-checkbox>
      </div>
      <div v-else>
        <p> Unknown type {{codingQuestion.ask.type}}</p>
      </div>
      <p>Coding Question: {{ codingQuestion}}</p>
    </div>
    <md-content class="container6 md-primary">
      <md-button class="md-icon-button md-raised" v-on:click.native="first()"> <md-icon>first_page</md-icon> </md-button>
      <md-button class="md-icon-button md-raised" v-on:click.native="previous()"> <md-icon>chevron_left</md-icon> </md-button>
      <div class="spacer">
      </div>
      <div v-for="beforeItem in before" :key = "beforeItem.key">
        <md-button class="md-icon-button">
        {{ beforeItem }}
        </md-button>
      </div>
      <div class="spacer">
      </div>
      <md-button class="md-icon-button md-raised" v-on:click.native="next()"> <md-icon>chevron_right</md-icon> </md-button>
      <md-button class="md-icon-button md-raised" v-on:click.native="last()"> <md-icon>last_page</md-icon> </md-button>
    </md-content>
  </div>
  
    
</div>
</template>


<script>
import {Project,Timeline} from '../js/Project'
export default {
  name: 'Code',
  props: {
    id:String,
    index:Number
  },
  methods:{
    first(){
      console.log("First")
    },
    previous(){
      this.$store.commit("code_previous",{id: this.id,value:this.codingQuestions})
    },
    next(){
      this.$store.commit("code_next",{id: this.id,value:this.codingQuestions})
    },
    last(){},
  },
  computed: {
    done(){
      if (this.project){
        if (this.project.codingTimeline){
          this.$store.commit("restoreTimeline",this.id)
          if (this.project.codingTimeline instanceof Timeline){
            return this.project.codingTimeline.isDone()
          }
        }
      }
      else{
        return true
      }
    },
    allCodings(){
      return this.$store.state
    },
    project(){
      return this.$store.state.codings.all[this.id]
    },
    response(){
      if (this.project){
        return this.project.codingTimeline.current.response
      }
      else{
        return "Error while loading response."
      }
    },
    codingQuestions(){
       if (this.project){
        return this.project.codingTimeline.current.coding_questions
      }
      else{
        return null
      }
    },
    questionsToShow(){
      if (this.project){
        return this.project.relevant_headers
      }
      else{
        return null
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.responseblock{
  background-color: #FA6;
  
}
.container6 {
  padding: 16pt;
  display: flex;
  align-items: center;
  justify-content: center }
.spacer{
  padding: 8pt;
}
</style>