<template>
  <div>
    <!-- <h1>CodingForm</h1>
    <p>{{element}}</p>-->
    <div class="md-headline container6">{{ element.question }}</div>
    <div class="md-title container6 responseblock">
      <p>" {{element.response}} "</p>
    </div>
    <div v-for="codingQuestion in element.coding_questions" :key="codingQuestion.key">
      <div v-if="codingQuestion.ask.type == 'string'">
        <md-field>
          <label>{{codingQuestion.show }}</label>
          <md-input v-model="codingQuestion.ask.model" />
        </md-field>
      </div>
      <div v-else-if="codingQuestion.ask.type == 'boolean'">
        <md-checkbox v-model="codingQuestion.ask.model">{{codingQuestion.show }}</md-checkbox>
      </div>
      <div v-else-if="codingQuestion.ask.type == 'number'">
        <md-field>
          <label>{{codingQuestion.show }}</label>
          <md-input type="number" v-model="codingQuestion.ask.model" />
        </md-field>
      </div>
      <div v-else-if="codingQuestion.ask.type == 'choice'">
        <p>Todo: Choice</p>
      </div>
      <div v-else>
        <p>Unknown type {{codingQuestion.ask.type}}</p>
      </div>
      <!-- <p>Coding Question: {{ codingQuestion}}</p> -->
    </div>
  </div>
</template>

<script>
import { watch } from "fs";
export default {
  name: "CodingForm",
  props: ["element", "index"],
  computed: {},
  watch: {
    index(to, from) {
      let tmp = Object.assign({}, this.element);
      tmp.index = from;
      this.$emit("result", tmp);
    }
  }
};
</script>

<style>
.responseblock {
  background-color: #fa6;
}
.container6 {
  padding: 16pt;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>



