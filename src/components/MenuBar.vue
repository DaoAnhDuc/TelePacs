<template>
  <div v-if="user" class="toolBar">
    <v-app-bar color="#1d2341" dense dark>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <div class="logo" @click="$router.replace('/')">
        <v-avatar size="37">
          <v-img src="assets/img/logo.png" />
        </v-avatar>
      </div>
      <v-toolbar-title>Tele Pacs</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu v-if="user" left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>fas fa-user</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-icon small>fas fa-user</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{user.name}}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action></v-list-item-action>
          </v-list-item>
          <!-- <v-list-item router to="/register" v-if="getIsAdmin">
            <v-list-item-action>
              <v-icon small>fas fa-user-plus</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Đăng ký</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action></v-list-item-action>
          </v-list-item> -->
          <v-list-item @click="onLogout">
            <v-list-item-action>
              <v-icon small>fas fa-sign-out-alt</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Đăng xuất</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action></v-list-item-action>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions("ui", ["toggleNavBar", "closeNavBar"]),
    ...mapActions("user", ["handleLogout"]),
    setTheme() {
      console.log(this.$vuetify.theme.dark);
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    onLogout() {
      this.handleLogout();
      this.$router.replace("/login");
      this.closeNavBar();
    },
    onLogin() {
      this.handleLogout();
      this.closeNavBar();
      this.$router.replace("/");
    }
  },
  computed: {
    ...mapGetters("user", ["authenticated", "user", "getIsAdmin"])
  }
};
</script>
<style lang="scss">
::-webkit-scrollbar {
  width: 0px;
}
.toolBar {
  .logo {
    margin-right: 10px;
  }
  .v-toolbar__content {
    padding: 4px 7px;
  }
}
</style>