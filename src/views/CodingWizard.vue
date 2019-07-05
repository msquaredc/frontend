<template>
  <div>
    <p>ID: {{id}}</p>
    <div v-if="loaded">
      <p>Coding Wizard</p>
      <p>Project: {{ project }}</p>
      <p>CurrentQuestion: {{currentQuestion}}</p>
      <div class="md-headline container6">ID:{{ id }}</div>
      <div class="md-title container6 responseblock">
        <p>" {{currentQuestion}} "</p>
      </div>
    </div>
    <div v-else>
      <p>Loading</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "CodeWizard",
  props: {
    id: String
  },
  data: () => {
    return {
      loaded: true
    };
  },
  methods: {},
  mounted() {
    this.$nextTick(() => {
      // Code that will run only after the
      // entire view has been rendered
      this.loaded = true;
    });
  },
  computed: {
    project() {
      return this.$store.getters.getProject(this.id);
    },
    currentQuestion() {
      return this.$store.getters.getCodingTimeline(this.id).current;
    },
    ...mapGetters({
      currentQuestionBla: "current_question"
    })
  }
};
</script>

<style lang="scss" scoped>
.responseblock {
  background-color: #fa6;
}
.container6 {
  padding: 16pt;
  display: flex;
  align-items: center;
  justify-content: center;
}
.spacer {
  padding: 8pt;
}
</style>