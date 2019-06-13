<template>
    <div>
    <h1>Your Table3:</h1>

    <md-table @md-selected="onSelect">
      <md-table-row md-selectable="multiple" md-auto-select v-for="title in header" :key=title.id>
          <md-table-cell> {{title}} </md-table-cell>
          <md-table-cell v-for="row in table" :key=row.id> {{row[title]}} </md-table-cell>
      </md-table-row>
    </md-table>
    <p> Und die andere...</p>
    <md-table v-model="invertedTable" md-card @md-selected="onSelect">
        <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="Category" md-sort-by="Category">
            {{ item.Category }}
            </md-table-cell>
            <md-table-cell >
            </md-table-cell>
        </md-table-row>
    </md-table>    
    <p> Your selection: {{selected}} </p>
  </div>
</template>

<script>
export default {
    name: 'invertedtable',
    data: function () {
        return {
            selected: [],
        }
    },
    props: ['table','header'],
    methods: {
      onSelect (items) {
        this.selected = items
      },
    },
    computed: {
        invertedTable (){
            if (this.table != null){ 
                var new_table = []
                this.header.forEach(headtitle => {
                    var res = {"Category":headtitle}
                    this.table.forEach((row,index) => {
                        res[index]=row[headtitle]
                    }, this);
                    new_table.push(res)
                }, this);
                console.log(new_table)
                return new_table
            }
            else {
                return this.table
            }
        }
    }
}
</script>

<style>

</style>
