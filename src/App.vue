<template>
  <div class="page-container md-layout-column">
    <Toolbar></Toolbar>
    
    <md-content>
      <FileUpload></FileUpload>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error quibusdam, non molestias et! Earum magnam, similique, quo recusandae placeat dicta asperiores modi sint ea repudiandae maxime? Quae non explicabo, neque.
      
    </md-content>
  </div>
</template>

<script>
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
    min-height: 100vh;
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(#000, .12);
  }
  .md-content {
    padding: 16px;
  }
</style>