<template>
  <div>
  <Toolbar>
    <span class="md-content">
      <router-view></router-view>
    </span>
  </Toolbar>
  </div>
</template>

<script>
  import router from './router.js'
  import Toolbar from './components/Toolbar.vue'
  export default {
    name: 'Temporary',
    data: function(){
      return {
        file:null
        }
    },
    components: {
      Toolbar
    },
    methods: {
      loadTextFromFile(ev) {
        const file = ev.target.files[0];
        const reader = new FileReader();

        reader.onload = e => this.$emit("load", e.target.result);
        reader.readAsText(file);
      }
    },
    computed: {
      creationStep (){
        return this.$store.state.creation.step
      }
    }
  }
</script>

<style lang="scss" scoped>
  .page-container {
    min-width: 100vh;
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(#000, .12);
  }
  .md-content {
    padding: 16px;
  }
</style>