<template>
  <div>
    <md-card>
      <md-card-header>
        <div class="md-title">{{ id }}</div>
      </md-card-header>

      <md-card-content>
        <!--         {{ codingData }} -->
        <md-progress-bar md-mode="determinate" :md-value="progress/length*100"></md-progress-bar>
        <p>{{ progress }} of {{ length }} Questions coded.</p>
        <p></p>
        <p>Overall progress: {{ progress/length*100}} %</p>
      </md-card-content>

      <md-card-actions>
        <md-button class="md-primary md-raised">View Project</md-button>
        <router-link :to="{name:'code', params:{id:id,index:-1}}" append>
          <md-button class="md-primary md-raised">Code</md-button>
        </router-link>
      </md-card-actions>
    </md-card>
  </div>
</template>


<script>
export default {
  name: "Coding",
  props: {
    id: String
  },
  computed: {
    project() {
      return this.$store.getters.getProject(this.id);
    },
    progress() {
      return this.project.getProgress();
    },
    length() {
      return this.project.codingTimeline.lengthMethod();
    }
  }
};
</script>

<style lang="scss" scoped>
.md-card {
  width: 320px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
</style>