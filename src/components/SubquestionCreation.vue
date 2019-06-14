<template>
    <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
        <md-toolbar :md-elevation="1">
            <div class="md-toolbar-row">
                <div class="md-toolbar-section-start">
                    <span class="md-title">{{ question }}</span>
                </div>
                <div class="md-toolbar-section-end">
                    <md-button class="md-fab md-primary md-mini" @click="active = true">
                        <md-icon>add</md-icon>
                    </md-button>
                </div>
            </div>
        </md-toolbar>
        <md-list v-if="subquestions.length">
            <!-- <md-subheader>Phone</md-subheader> -->
            <md-list-item v-for="subquestion in subquestions" :key="subquestion.key">
                <div class="md-list-item-text">
                    <span>Text: {{ subquestion.text }}</span>
                    <span>Mobile</span>
                </div>
            </md-list-item>
            <md-speed-dial class="md-bottom-right md-mini">
                <md-speed-dial-target>
                    <md-icon>add</md-icon>
                </md-speed-dial-target>
            </md-speed-dial>
        </md-list> 
        <div v-else> 
            <p> No Question yet</p>
            <md-speed-dial class="md-bottom-right">
                <md-speed-dial-target>
                    <md-icon>add</md-icon>
                </md-speed-dial-target>
            </md-speed-dial>
        </div>
        <md-dialog :md-active.sync="active">
            <md-dialog-title>Preferences</md-dialog-title>
            <md-dialog-content>
            <div class="md-layout md-gutter">
                <div class="md-layout-item">
                    <md-radio v-model="inputType" value="string"> Text input</md-radio>
                    <md-radio v-model="inputType" value="number"> Number input</md-radio>
                    <md-radio v-model="inputType" value="range" >Range</md-radio>
                    <md-radio v-model="inputType" value="boolean">Yes/No</md-radio>
                    <md-radio v-model="inputType" value="choice">Choice</md-radio>
                </div>
                
            </div>
            <div class="md-layout md-gutter">
                <div class="md-layout-item">
                    <div v-if="inputType === 'string'">
                       <p> You selected String. </p>
                    </div>
                    <div v-else-if="inputType === 'number'">
                        <p> You selected Number. </p>
                    </div>
                </div>
            </div>
            </md-dialog-content>
            <md-dialog-actions>
                <md-button class="md-primary" @click="active = false">Close</md-button>
                <md-button class="md-primary" @click="active = false">Save</md-button>
            </md-dialog-actions>
        </md-dialog>
    </div>
</template>

<script>
export default {
    name: 'SubquestionCreation',
    data: function () {
        return {
            active:false,
            inputType:null,
        }
    },
    props: ['question'],
    computed:{
      subquestions (){
        return this.$store.state.creation.question[this.question]
      },
    }
}
</script>

<style>

</style>
