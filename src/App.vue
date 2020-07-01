<template>
  <v-app class="app">
    <v-content>
      <MenuBar />
      <div style="position: relative">
        <div class="progress-bar" v-if="loadingPage">
          <v-progress-circular :size="50" :width="8" indeterminate color="teal"></v-progress-circular>
        </div>
        <router-view />
      </div>
    </v-content>
  </v-app>
</template>
<script>
import { mapState } from "vuex";
import MenuBar from "./components/MenuBar";
export default {
  name: "App",
  components: {
    MenuBar
  },

  data: () => ({
    //
  }),
  computed: {
    ...mapState("ui", ["loadingPage"])
  }
};
</script>
<style >
.progress-bar {
  position: absolute;
  width: 100%;
  height: calc(100vh - 48px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999999;
  top: 0;
  left: 0;
}
.v-btn{
  text-transform: none;
}
.theme--dark.v-data-table {
  background-color: #223f5d !important;
}
.theme--light .progress-bar {
  background: #fffffed1;
}
.theme--dark.v-application.app {
  background: #19344e;
  color: #ffffff;
}
.theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
    background: #fffafa40;
    color: #000;
}
.theme--dark.v-text-field--solo > .v-input__control > .v-input__slot {
    background-color: #274a6b !important;
    color: #fff;
}
.theme--dark.v-data-table tbody tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background: #275684 !important;
}
.theme--dark.v-pagination .v-pagination__item {
    background: #1f4a73 !important;
    color: #FFFFFF;
}
.theme--dark.v-pagination .v-pagination__navigation {
    background: #1f4a73 !important;
}
.theme--dark.v-sheet {
    background-color: #2c4d67;
    border-color: #2c4d67;
    color: #FFFFFF;
}
.theme--dark.v-card {
    background-color: #27415a !important;
    color: #ffffff;
}
.v-messages__message{
  color: #9e9494;
}
</style>
