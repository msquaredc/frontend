<template>
  <div class="page-container md-layout-column">
    <md-app>
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="showNavigation = true">
          <md-icon>menu</md-icon>
        </md-button>
        <router-link :to="{name:'home'}">
          <span class="md-title">M²C</span>
        </router-link>
        <!--  <div class="md-toolbar-section-end">
          <md-button @click="showSidepanel = true">Favorites</md-button>
        </div>-->
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="showNavigation" md-swipeable>
        <md-toolbar class="md-transparent" md-elevation="0">
          <span class="md-title">My App name</span>
        </md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">Inbox</span>
          </md-list-item>

          <md-list-item>
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Sent Mail</span>
          </md-list-item>

          <md-list-item>
            <md-icon>delete</md-icon>
            <span class="md-list-item-text">Trash</span>
          </md-list-item>

          <md-list-item>
            <md-icon>error</md-icon>
            <span class="md-list-item-text">Spam</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <!-- <md-drawer class="md-right" :md-active.sync="showSidepanel">
          <md-toolbar class="md-transparent" md-elevation="0">
            <span class="md-title">Favorites</span>
          </md-toolbar>

          <md-list>
            <md-list-item>
              <span class="md-list-item-text">Abbey Christansen</span>

              <md-button class="md-icon-button md-list-action">
                <md-icon class="md-primary">chat_bubble</md-icon>
              </md-button>
            </md-list-item>

            <md-list-item>
              <span class="md-list-item-text">Alex Nelson</span>

              <md-button class="md-icon-button md-list-action">
                <md-icon class="md-primary">chat_bubble</md-icon>
              </md-button>
            </md-list-item>

            <md-list-item>
              <span class="md-list-item-text">Mary Johnson</span>

              <md-button class="md-icon-button md-list-action">
                <md-icon>chat_bubble</md-icon>
              </md-button>
            </md-list-item>
          </md-list>
        </md-drawer>-->
        <slot></slot>
      </md-app-content>
    </md-app>
  </div>
</template>

<style lang="scss" scoped>
.md-app {
  border: 1px solid rgba(#000, 0.12);
  height: 100vh;
  width: 100vw;
}

// Demo purposes only
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
</style>

<script>
export default {
  name: "LastRowFixed",
  data: () => ({
    showNavigation: false,
    showSidepanel: false
  })
};
</script>