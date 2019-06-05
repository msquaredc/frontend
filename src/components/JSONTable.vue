<template>
    <div>
    <h1>Your Table:</h1>

    <md-table>
      <md-table-row>
        <md-table-head v-for="title in header" v-bind:key="title.id">{{title}}</md-table-head>
      </md-table-row>

      <md-table-row v-for="row in table" v-bind:key="row.id">
          <md-table-cell v-for="title in header" v-bind:key="title.id"> {{row[title]}} </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
    name: 'jsontable',
    data: function () {
        return {
            bla:null
        }
    },
    props: ['table','header']
}
</script>

<style>

</style>
