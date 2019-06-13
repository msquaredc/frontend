<template>
    <div>
    <h1>Your Table:</h1>

    <md-table>
      <md-table-row>
        <md-table-head v-for="title in header">{{title}}</md-table-head>
      </md-table-row>

      <md-table-row v-for="row in table">
          <md-table-cell v-for="title in header"> {{row[title]}} </md-table-cell>
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
    computed:{
      header: function() {
        return table_data.header
      },
      row: function() {
        return table_data.table
      }
    },
    props: ['table_data']
}
</script>

<style>

</style>
