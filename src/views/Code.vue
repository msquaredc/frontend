<template>
  <div>
    <div v-if="done">
      <p>You're done</p>
      <router-link :to="{name:'result', params:{id:id}}" append>
        <md-button class="md-primary md-raised">See the result!</md-button>
      </router-link>
    </div>
    <div class="md-headline container6">{{ currentQuestion.question }}</div>
    <div class="md-title container6 responseblock">
      <p>" {{response}} "</p>
    </div>
    <!-- <p> All Codings: {{allCodings}}</p> -->
    <!-- <p>{{index}}</p>
    <p>Done {{done}}</p>
    <!-- <p>Project : {{ project }}</p>
    <p v-for="entry in project" :key="entry.key">{{entry}}</p>-->
    <!-- <p>Previous: {{codingTimeline.previous}}</p>
    <p>Current {{project.codingTimeline.current}}</p>
    <p>Next: {{codingTimeline.next}}</p>-->
    <!-- <p>CurrentQuestion: {{currentQuestion}}</p> -->
    <div v-for="codingQuestion in currentQuestion.coding_questions" :key="codingQuestion.key">
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
      <div v-else>
        <p>Unknown type {{codingQuestion.ask.type}}</p>
      </div>
      <!-- <p>Coding Question: {{ codingQuestion}}</p> -->
    </div>
    <!--     <md-content class="container6 md-primary">
      <md-button class="md-icon-button md-raised" v-on:click.native="first()">
        <md-icon>first_page</md-icon>
      </md-button>
      <md-button class="md-icon-button md-raised" v-on:click.native="previous()">
        <md-icon>chevron_left</md-icon>
      </md-button>
      <div class="spacer"></div>

      <div v-for="proximityItem in proximity" :key="proximityItem.key">
        <md-button class="md-icon-button md-raised">{{ proximityItem+1}}</md-button>
      </div>
      <div class="spacer"></div>
      <md-button class="md-icon-button md-raised" v-on:click.native="next()">
        <md-icon>chevron_right</md-icon>
      </md-button>
      <md-button class="md-icon-button md-raised" v-on:click.native="last()"></md-button>
    </md-content>-->
    <md-progress-bar md-mode="determinate" :md-value="amount"></md-progress-bar>
    <md-bottom-bar class="md-accent" md-sync-route>
      <md-bottom-bar-item v-on:click.native="first()">
        <md-icon>first_page</md-icon>
      </md-bottom-bar-item>
      <md-bottom-bar-item v-on:click.native="previous()">
        <md-icon>chevron_left</md-icon>
      </md-bottom-bar-item>

      <div v-for="proximityItem in proximity" :key="proximityItem.key">
        <md-bottom-bar-item :to="exactNumber(proximityItem)">{{ proximityItem+1}}</md-bottom-bar-item>
      </div>

      <md-bottom-bar-item v-on:click.native="next()">
        <md-icon>chevron_right</md-icon>
      </md-bottom-bar-item>
      <md-bottom-bar-item v-on:click.native="last()">
        <md-icon>last_page</md-icon>
      </md-bottom-bar-item>
    </md-bottom-bar>
    <!--     <md-content>
      <ProjectResult :id="id"></ProjectResult>
    </md-content>-->
  </div>
</template>


<script>
import { Project, Timeline } from "../js/Project";
import ProjectResult from "../components/ProjectResult.vue";
export default {
  name: "Code",
  props: {
    id: String,
    index: Number
  },
  components: { ProjectResult },
  methods: {
    exactNumber(number) {
      return number.toString();
    },
    first() {},
    previous() {
      this.$store.dispatch("code_previous", {
        id: this.id,
        value: this.currentQuestion
      });
    },
    next() {
      this.$store.dispatch("code_next", {
        id: this.id,
        value: this.currentQuestion
      });
    },
    last() {}
  },
  computed: {
    current_index: {
      get() {
        return this.$store.getters.getCodingTimeline(this.id).currentIndex();
      },
      set(index) {
        this.index = index;
        this.$store.dispatch("setCurrentIndex", {
          id: this.id,
          index: index
        });
      }
    },
    amount() {
      return (100 * this.progress) / this.length;
    },
    progress() {
      return this.project.getProgress();
    },
    length() {
      return this.project.codingTimeline.length();
    },
    done() {
      return this.project.codingTimeline.isDone();
    },
    allCodings() {
      return this.$store.state;
    },
    project() {
      return this.$store.getters.getProject(this.id);
    },
    currentQuestion() {
      return this.$store.getters.getCodingTimeline(this.id).current;
    },
    codingTimeline() {
      return this.$store.getters.getCodingTimeline(this.id);
    },
    response() {
      return this.currentQuestion.response;
    },
    proximity() {
      return this.$store.getters.getCodingTimeline(this.id).proximity();
    }
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