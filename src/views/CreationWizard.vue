<template>
  <div>
    <md-steppers md-sync-route md-dynamic-height md-linear>
      <md-step id="first" to="/create/components/steppers" exact md-label="First Step">
        <FileUpload></FileUpload>
        <p> Hello World </p>
        <md-button class="md-raised md-primary" @click="setDone('first', 'second')">Continue</md-button>
      </md-step>

      <md-step id="second" to="/create/components/steppers/second" md-label="Second Step">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet quaerat modi cumque quos sed, temporibus nemo eius amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore placeat nulla.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet quaerat modi cumque quos sed, temporibus nemo eius amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore placeat nulla.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet quaerat modi cumque quos sed, temporibus nemo eius amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore placeat nulla.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet quaerat modi cumque quos sed, temporibus nemo eius amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore placeat nulla.</p>
        <md-list>
          <md-list-item to="/create/components/steppers/second/sub1">Subpage 1</md-list-item>
          <md-list-item to="/create/components/steppers/second/sub2">Subpage 2</md-list-item>
        </md-list>
      </md-step>

      <md-step id="third" to="/create/components/steppers/third" md-label="Third Step">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet quaerat modi cumque quos sed, temporibus nemo eius amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore placeat nulla.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet quaerat modi cumque quos sed, temporibus nemo eius amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore placeat nulla.</p>
      </md-step>
    </md-steppers>
    <md-list>
      <md-list-item to="/create/components/steppers/second/sub1">Subpage 2-1</md-list-item>
      <md-list-item to="/create/components/steppers/second/sub2">Subpage 2-2</md-list-item>
    </md-list>
  </div>
</template>

<script>
import FileUpload from '../components/FileUpload.vue'
export default {
name: 'CreationWizard',
components: {FileUpload},
}
</script>