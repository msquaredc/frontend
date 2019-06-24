<template>
<div>
    <p> Test </p>
    <p> {{currentProject}} </p>
</div>
</template>


<script>
export default {
  name: 'Code',
  props: {
    coding: String
  },
  computed: {
    currentProject (){
      return this.$route.params
    }
  }
}
</script>

<style lang="scss" scoped>
</style>