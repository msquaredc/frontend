<template>
  <div>
    <span class="md-headline">Your Table:</span>
    <p>AllCodings: {{allCodings}}</p>
    <p>Timeline: {{project.codingTimeline}}</p>
    <!--    <p>ID: {{ id }}</p>
    <p>Relevant Headers: {{project.relevant_headers}}</p>
    <p>
    Irrelevant Headers: {{project.getAllIrrelevantHeaders()}}</p>-->
    <md-table>
      <md-table-row>
        <md-table-head v-for="title in header" :key="title.key">{{title}}</md-table-head>
      </md-table-row>

      <!--  <md-table-row v-for="row in project.export()" :key="row.key">
        <md-table-cell
          v-for="irrelevantHeader in project.getAllIrrelevantHeaders()"
          :key="irrelevantHeader.key"
        >{{row[irrelevantHeader]}}</md-table-cell>
      </md-table-row>-->
      <div v-for="ResponseCoding in allCodings" :key="ResponseCoding.key">
        <div
          v-for="ActualRow in project.getIrrelevantHeader(ResponseCoding.question,ResponseCoding.response)"
          :key="ActualRow.key"
        >
          <md-table-row
            v-for="CodingQuestion in ResponseCoding.coding_questions"
            :key="CodingQuestion.key"
          >
            <md-table-cell
              v-for="irrelevantHeader in project.getAllIrrelevantHeaders()"
              :key="irrelevantHeader.key"
            >{{ActualRow[irrelevantHeader]}}</md-table-cell>
            <md-table-cell>{{ResponseCoding.done}}</md-table-cell>
            <md-table-cell>{{ResponseCoding.question}}</md-table-cell>
            <md-table-cell>{{ResponseCoding.response}}</md-table-cell>
            <md-table-cell>{{CodingQuestion.show}}</md-table-cell>
            <md-table-cell>{{CodingQuestion.ask.model}}</md-table-cell>
          </md-table-row>
        </div>
      </div>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "ProjectResult",
  data: function() {
    return {};
  },
  props: ["id"],
  computed: {
    header() {
      return this.$store.getters
        .getAllIrrelevantHeaders(this.id)
        .concat([
          "Done",
          "Question",
          "Response",
          "CodingQuestion",
          "CodingAnswer"
        ]);
    },
    allCodings() {
      return this.project.codingTimeline.all();
    },
    project() {
      return this.$store.getters.getProject(this.id);
    }
  }
};
</script>

<style>
</style>
