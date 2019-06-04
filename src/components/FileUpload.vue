
<template>
<div>
  <md-content>
  <div class="parse">
    <md-headline>Parse CSV to JSON</md-headline>
    <input 
      id="fileInput"
      type="file"
      @change="upload">
    <a
      @click='save'
      type='button'
      download >
      Save
    </a>
    <div class="body">
      <div class="entry">
        <textarea 
          class="entry-result"
          v-model='json'
          placeholder="Type here">
        </textarea>
      </div>
    </div>
  </div>
  </md-content>
  <md-content>
  <jsontable v-bind:table="doc" v-bind:header="header"></jsontable>
  </md-content>
</div>
</template>

<script>
import jsontable from './JSONTable.vue'
import Papa from 'papaparse'
import Blob from 'blob'
import FileSaver from 'file-saver'
export default {
name: 'parse',
components:{jsontable},
data: function () {
    return {
        doc: null,
        header: null,
        json: null,
        }
    },
methods: {
    upload (e) {
    const that = this
    const fileToLoad = event.target.files[0]
    const reader = new FileReader()
    reader.onload = fileLoadedEvent => {
        Papa.parse(fileLoadedEvent.target.result, {
        header: true,
        complete (results) {
            console.log('complete', results)
            that.doc = results.data
            that.header = results.meta['fields']
            that.json = JSON.stringify(results.data, null, 2)
        },
        error (errors) {
            console.log('error', errors)
        }
        })
    }
    reader.readAsText(fileToLoad)
    },
    save () {
    const blob = new Blob([this.parseJSONtoCSV()], { type: 'text/csv' })
    FileSaver.saveAs(blob, 'test.csv')
    },
    parseJSONtoCSV () {
    return Papa.unparse(this.json)
    }
},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .body {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
  .entry {
    width: 40%;
  }
  .entry-result {
    width: 100%;
    height: 50vh;
  }
  .preview {
    width: 40%;
    text-align: left;
  }
</style>