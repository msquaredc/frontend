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
                    <span>Text: {{ subquestion }}</span>
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
                <md-field>
                    <label>Label</label>
                    <md-input v-model="label"></md-input>
                </md-field>
                <md-radio v-model="inputType" value="string"> Text input</md-radio>
                <md-radio v-model="inputType" value="number"> Number input</md-radio>
                <md-radio v-model="inputType" value="range" >Range</md-radio>
                <md-radio v-model="inputType" value="boolean">Yes/No</md-radio>
                <md-radio v-model="inputType" value="choice">Choice</md-radio>

                <div v-if="inputType === 'string'">
                    <!-- <p> You selected String. </p> -->
                </div>
                <div v-else-if="inputType === 'number'">
                    <md-checkbox v-model="numberUseRange" class="md-primary"> Set bounds </md-checkbox>
                    <div v-if="numberUseRange">
                        <md-field>
                            <label>Lower Bound</label>
                            <md-input v-model="lowerBound" type="number"></md-input>
                        </md-field>
                        <md-field>
                            <label>Upper Bound</label>
                            <md-input v-model="upperBound" type="number"></md-input>
                        </md-field>
                    </div>
                </div>
                <div v-else-if="inputType === 'range'">
                    <md-field>
                        <label>Add a choice</label>
                        <md-input v-model="currentChoice"></md-input>
                        <span class="md-helper-text">Type in a choice</span>
                    </md-field>
                    <md-button class="md-raised md-primary" @click="addChoice">ADD</md-button>
                     <md-list>
                         <md-list-item v-for="choice in choices" v-bind:key = "choice.key">
                             <span class="md-list-item-text">{{ choice }}</span>
                         </md-list-item>
                     </md-list>
                </div>
            </md-dialog-content>
            <md-dialog-actions>
                <md-button class="md-primary" @click="addCodingQuestion">Add</md-button>
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
            label:null,
            numberUseRange:false,
            upperBound:10,
            lowerBound:0,
            choices: [],
            currentChoice: null,
        }
    },
    props: ['question'],
    methods:{
        addChoice: function () {
            if (this.currentChoice){
                this.choices.push(this.currentChoice)
                this.currentChoice = null
            }
        },
        addCodingQuestion: function (){
            this.active = false;
            if (this.inputType === 'string'){
                this.$store.commit('addQuestion',{'show':this.label,'ask':"Nix",'header':this.question})
            }
        }
    },
    computed:{
      subquestions (){
        return this.$store.state.creation.question[this.question]
      },
    }
}
</script>

<style>

</style>
