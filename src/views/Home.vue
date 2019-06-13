<template>
  <div v-if="allCodings.length > 0">
    All Codings: {{ allCodings }}
  </div>
  <div v-else>
    <md-empty-state
      md-icon="devices_other"
      md-label="Create your first project"
      md-description="Creating project, you'll be able to upload your data and collaborate with people.">
      <md-button class="md-primary md-raised" to="/create/">Create first project</md-button>
  </md-empty-state>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  computed: {
    allCodings (){
      return Object.keys(this.$store.state)
    },
  }
}
</script>
