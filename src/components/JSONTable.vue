<template>
    <div>
    <span class="md-headline">
    Your Table:
    </span>
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
    props: ['table','header'],
    computed:{
      tableUnref: function (){
        return this.table()
      },
      headerUnref: function (){
        return this.header()
      }
    }
}
</script>

<style>

</style>
