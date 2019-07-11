<template>
  <div>
    <!-- <h1>Pagination</h1>
    <p>Elements: {{elements}}</p>
    <p>Index: {{index}}</p>
    <p>Current: {{current}}</p>-->
    <CodingForm v-bind:element="current"></CodingForm>
    <md-bottom-bar class="md-accent" :md-active-item="exactNumber(index)">
      <md-bottom-bar-item v-on:click.native="goTo(first)">
        <md-icon>first_page</md-icon>
      </md-bottom-bar-item>
      <md-bottom-bar-item v-on:click.native="goTo(previous)">
        <md-icon>chevron_left</md-icon>
      </md-bottom-bar-item>

      <div v-for="proximityItem in proximity" :key="proximityItem.key">
        <md-bottom-bar-item
          :id="exactNumber(proximityItem)"
          v-on:click.native="goTo(proximityItem)"
        >{{ proximityItem+1}}</md-bottom-bar-item>
      </div>

      <md-bottom-bar-item v-on:click.native="goTo(next)">
        <md-icon>chevron_right</md-icon>
      </md-bottom-bar-item>
      <md-bottom-bar-item v-on:click.native="goTo(last)">
        <md-icon>last_page</md-icon>
      </md-bottom-bar-item>
    </md-bottom-bar>
  </div>
</template>

<script>
import CodingForm from "../components/CodingForm.vue";
export default {
  components: { CodingForm },
  name: "Pagination",
  props: {
    elements: Array,
    init_index: Number
  },
  methods: {
    exactNumber(num) {
      return num.toString();
    },
    goTo(num) {
      console.log(num);
      this.$router.push({ name: "code", params: { index: num } });
      this.index2 = num;
    },
    cleanIndex(num) {
      if (num < 0) {
        this.$router.push({ name: "code", params: { index: 0 } });
        return 0;
      } else {
        return num;
      }
    }
  },
  data() {
    return {
      index2: this.cleanIndex(this.init_index)
    };
  },
  /* watch: {
    $route(to, from) {
      console.log(to, from);
      this.index2 = to.params.index;
    }
  }, */
  computed: {
    index() {
      return this.index2;
    },
    lengthFunc() {
      return this.elements.length;
    },
    current() {
      return this.elements[this.index2];
    },
    proximity() {
      let res = [];
      let dist;
      let amount = Math.min(this.lengthFunc, 5);
      res.push(this.index);
      for (dist = 1; res.length < amount; dist++) {
        if (this.index - dist >= 0) {
          res.unshift(this.index - dist);
        }
        if (this.index + dist < this.lengthFunc) {
          res.push(this.index + dist);
        }
      }
      return res;
    },
    next() {
      return Math.min(this.index + 1, this.lengthFunc - 1);
    },
    previous() {
      return Math.max(this.index - 1, 0);
    },
    first() {
      return 0;
    },
    last() {
      return this.lengthFunc - 1;
    }
  }
};
</script>
