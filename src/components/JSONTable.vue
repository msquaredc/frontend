<template>
    <div>
    <h1>JSONTable:</h1>

    <p>Table: {{ table }}</p>

    <p>Header: {{ header }}</p>
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
    props: ['table','header']
}
</script>

<style>

</style>
