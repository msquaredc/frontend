<template>
  <div>
    <div v-if="done">
      <p>
        You're done
        <router-link :to="{name:'result', params:{id:id}}" append>
          <md-button class="md-primary md-raised">See the result!</md-button>
        </router-link>
      </p>
    </div>
    <Pagination :elements="allQuestions" :init_index="index-1" v-on:result="storeResult"></Pagination>
    <md-progress-bar md-mode="determinate" :md-value="progress"></md-progress-bar>
    <md-content>
      <router-link :to="{name:'result', params:{id:id}}" append>
        <md-button class="md-primary md-raised">See the result!</md-button>
      </router-link>
    </md-content>
    <!--<md-bottom-bar class="md-accent" :md-active-item="exactNumber(index)">
      <md-bottom-bar-item :to="exactNumber(0)">
        <md-icon>first_page</md-icon>
      </md-bottom-bar-item>
      <md-bottom-bar-item :to="previous">
        <md-icon>chevron_left</md-icon>
      </md-bottom-bar-item>

      <div v-for="proximityItem in proximity" :key="proximityItem.key">
        <md-bottom-bar-item
          :id="exactNumber(proximityItem)"
          :to="exactNumber(proximityItem)"
        >{{ proximityItem+1}}</md-bottom-bar-item>
      </div>

      <md-bottom-bar-item :to="next">
        <md-icon>chevron_right</md-icon>
      </md-bottom-bar-item>
      <md-bottom-bar-item :to="exactNumber(lengthFunc-1)">
        <md-icon>last_page</md-icon>
      </md-bottom-bar-item>
    </md-bottom-bar>
    <md-content>
      <p>{{index}}</p>
    </md-content>-->
  </div>
</template>


<script>
import { Project, Timeline } from "../js/Project";
import ProjectResult from "../components/ProjectResult.vue";
import CodingForm from "../components/CodingForm.vue";
import Pagination from "../components/Pagination.vue";
export default {
  name: "Code",
  props: {
    id: String,
    index: Number
  },
  data() {
    return {
      progress: this.project.getProgress()
    };
  },
  components: { ProjectResult, CodingForm, Pagination },
  methods: {
    /*  exactNumber(number) {
      return number.toString();
    },
    previous2() {
      this.$store.dispatch("code_previous", {
        id: this.id,
        value: this.currentQuestion
      });
    },
    next2() {
      this.$store.dispatch("code_next", {
        id: this.id,
        value: this.currentQuestion
      });
    },
    last() {}, */
    storeResult(result) {
      result.done = true;
      let tmp = result.index;
      delete result.index;
      this.$store.dispatch("setAtIndex", {
        index: tmp,
        id: this.id,
        value: result
      });
      this.progress = this.$store.getters.getProject(this.id).getProgress();
    }
  },
  /* watch: {
    $route(to, from) {
      console.log(to);
      this.current_index = to.params.index;
      this.index = to.params.index;
      this.index2 = to.params.index;
    }
  }, */
  computed: {
    next() {
      return Math.min(
        this.index + 1,
        this.project.codingTimeline.lengthMethod() - 1
      ).toString();
    },
    previous() {
      return Math.max(this.index - 1, 0).toString();
    },
    /* index() {
      return this.$store.getters.getCodingTimeline(this.id).currentIndex();
    }, */
    /* current_index: {
      get() {
        return this.$store.getters.getCodingTimeline(this.id).currentIndex();
      },
      set(index) {
        this.$store.dispatch("setCurrentIndex", {
          id: this.id,
          index: index
        });
      }
    }, */
    progress2() {
      return this.$store.getters.getProject(this.id).getProgress();
    },
    done() {
      if (this.project) {
        return this.project.isDone();
      } else {
        return false;
      }
    },
    /* allCodings() {
      return this.$store.state;
    }, */
    project() {
      console.log("Code.project");
      return this.$store.getters.getProject(this.id);
    },
    /* currentQuestion() {
      console.log("Code.currentQuestion " +this.index+" --> Start");
      let tmp = this.$store.getters
        .getCodingTimeline(this.id)
        .getByIndex(this.index);
      console.log("Code.currentQuestion " +tmp+" --> Return");

      return tmp
    },
    codingTimeline() {
      console.log("Code.getCodingTimeline")
      return this.$store.getters.getCodingTimeline(this.id);
    },
    response() {
      return this.currentQuestion.response;
    },
    proximity() {
      console.log("Code.proximity")
      return this.$store.getters.getCodingTimeline(this.id).proximity();
    }, */
    allQuestions() {
      return this.project.codingTimeline;
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