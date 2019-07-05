<template>
  <div v-if="allCodings.length > 0">
    <div class="md-layout md-gutter md-alignment-center">
      <div class="md-layout-item" v-for="coding in codings.all" :key="coding.key">
        <Coding :id="coding.id"></Coding>
      </div>
    </div>
  </div>
  <div v-else>
    <md-empty-state
      md-icon="devices_other"
      md-label="Create your first project"
      md-description="Creating project, you'll be able to upload your data and collaborate with people."
    >
      <md-button class="md-primary md-raised" to="/create/">Create first project</md-button>
    </md-empty-state>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Coding from "@/components/Coding.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
    Coding
  },
  computed: {
    allCodings() {
      return Object.keys(this.$store.state.codings.all);
    },
    codings() {
      return this.$store.state.codings;
    }
  }
};
</script>
