<template>
  <div>
  <Toolbar>
      <router-view></router-view>
      <FileUpload></FileUpload>
  </Toolbar>
  </div>
</template>

<script>
  import router from './router.js'
  import Toolbar from './components/Toolbar.vue'
  import FileUpload from './components/FileUpload.vue'
  export default {
    name: 'Temporary',
    data: function(){
      return {
        file:null
        }
    },
    components: {
      Toolbar, FileUpload
    },
    methods: {
      loadTextFromFile(ev) {
        const file = ev.target.files[0];
        const reader = new FileReader();

        reader.onload = e => this.$emit("load", e.target.result);
        reader.readAsText(file);
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