<template>
  <div>
  <Toolbar>
    <div class="page-container">
      <div class="md-layout md-gutter">
    <div class="md-layout-item md-size-15 md-small-hide"></div>
    <div class="md-layout-item">
      <router-view></router-view>
      </div>
    <div class="md-layout-item md-size-15 md-small-hide"></div>
  </div>
    
    </div>
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
    max-width: 100vw;
    max-height: 100vh;
    overflow: hidden;
    position: relative;
//    border: 1px solid rgba(#000, .12);
  }
  .md-content {
    padding: 16px;
  }
  .router-view{
    padding: 16px;
  }
</style>