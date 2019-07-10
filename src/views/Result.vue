<template>
  <div>
    <md-button v-on:click.native="toCSV()" class="md-raised md-primary">Export</md-button>
    <ProjectResult :id="id"></ProjectResult>
  </div>
</template>

<script>
import Papa from "papaparse";
import download from "downloadjs";
import ProjectResult from "../components/ProjectResult";
export default {
  components: {
    ProjectResult
  },
  props: {
    id: String
  },
  methods: {
    toCSV() {
      let res = Papa.unparse(Array.from(this.project.export(false)), {
        quotes: true, //or array of booleans
        quoteChar: '"',
        escapeChar: '"',
        delimiter: ";",
        header: true,
        newline: "\r\n",
        skipEmptyLines: true, //or 'greedy',
        columns: null //or array of strings
      });
      download(res, "result.csv", "text/csv");
    }
  },
  computed: {
    project() {
      return this.$store.getters.getProject(this.id);
    }
  }
};
</script>

<style>
</style>
