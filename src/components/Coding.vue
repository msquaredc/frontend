<template>
<div>
    <md-card>
      <md-card-header>
        <div class="md-title">{{ coding }}</div>
      </md-card-header>

      <md-card-content>
<!--         {{ codingData }} -->
        <md-progress-bar md-mode="determinate" :md-value="questionProgress/questionAll*100"></md-progress-bar>
        <p> {{ questionProgress }} of {{ questionAll }} Questions coded. <p>
        <p> Overall progress: {{ questionProgress/questionAll*100}} % </p>
      </md-card-content>

      <md-card-actions>
        <md-button class="md-primary md-raised ">View Project</md-button>
        <md-button class="md-primary md-raised ">Code</md-button>
      </md-card-actions>
    </md-card>
    
</div>
</template>


<script>
export default {
  name: 'Coding',
  props: {
    coding: String
  },
  computed: {
    codingData (){
      return this.$store.state.codings.all[this.coding]
    },
    questionAll(){
        let prog = 0
        this.$store.state.codings.all[this.coding].relevant_headers.forEach(header => {
            prog += this.$store.state.codings.all[this.coding].question[header].length
        });
        return prog*this.$store.state.codings.all[this.coding].table.content.length
    },
    questionProgress(){
        let prog = 0
        this.$store.state.codings.all[this.coding].relevant_headers.forEach(header => {
            prog += this.$store.state.codings.all[this.coding].answer[header].length
        });
        return prog
    }
  }
}
</script>

<style lang="scss" scoped>
  .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
</style>