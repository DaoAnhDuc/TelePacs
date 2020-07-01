<template>
  <nav v-if="user">
    <v-navigation-drawer v-model="drawerNav" absolute app color class="py-0 nav-bar-app nav">
      <div>
        <p class="logo">VRPACS</p>
      </div>
      <v-list nav class="list-router">
        <v-list-item dense router to="/" class>
          <v-list-item-action>
            <v-icon small>fas fa-tachometer-alt</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Thống kê</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item dense router to="/sobaocao" class>
          <v-list-item-action>
            <v-icon small>fas fa-book</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Sổ báo cáo</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item dense router to="/Doctor" class>
          <v-list-item-action>
            <v-icon small>fas fa-user-nurse</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Bác sĩ</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <!-- <v-chip color="yellow darken-3" right small>Xong</v-chip> -->
          </v-list-item-action>
        </v-list-item>
        <v-list-item dense router to="/Patient" class>
          <v-list-item-action>
            <v-icon small>fas fa-user-injured</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Bệnh nhân</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <!-- <v-chip color="yellow darken-3" right small>Xong</v-chip> -->
          </v-list-item-action>
        </v-list-item>
        <v-list-item dense router to="/Studies" class>
          <v-list-item-action>
            <v-icon small>fas fa-file-alt</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Chỉ định</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <!-- <v-chip color="yellow darken-3" right small>Xong</v-chip> -->
          </v-list-item-action>
        </v-list-item>
        <v-list-item dense router to="/ServiceExs" class>
          <v-list-item-action>
            <v-icon small>fas fa-user-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dịch vụ kỹ thuật</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <!-- <v-chip color="yellow darken-3" right small>Xong</v-chip> -->
          </v-list-item-action>
        </v-list-item>
        <v-list-item dense router to="/TypeServices" class>
          <v-list-item-action>
            <v-icon small>fas fa-tasks</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Loại dịch vụ</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <!-- <v-chip color="yellow darken-3" right small>Xong</v-chip> -->
          </v-list-item-action>
        </v-list-item>
        <v-list-item dense router to="/Template" class>
          <v-list-item-action>
            <v-icon small>fas fa-file-word</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Mẫu kết quả</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <!-- <v-chip color="yellow darken-3" right small>Xong</v-chip> -->
          </v-list-item-action>
        </v-list-item>
        <v-list-item dense router to="/Backup" class>
          <v-list-item-action>
            <v-icon small>fas fa-save</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Backup</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <!-- <v-chip color="yellow darken-3" right small>Xong</v-chip> -->
          </v-list-item-action>
        </v-list-item>
        <v-list-item dense router to="/Configs" class>
          <v-list-item-action>
            <v-icon small>fas fa-tools</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Cấu hình</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <!-- <v-chip color="yellow darken-3" right small>Xong</v-chip> -->
          </v-list-item-action>
        </v-list-item>
        <v-list-item dense router to="/ServerPacs" class>
          <v-list-item-action>
            <v-icon small>fas fa-server</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Máy chủ Pacs</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item dense router to="/Hospital" class>
          <v-list-item-action>
            <v-icon small>fas fa-hospital-alt</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Bệnh viện</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <!-- <v-chip color="yellow darken-3" right small>Xong</v-chip> -->
          </v-list-item-action>
        </v-list-item>
        <v-list-item dense router to="/phanquyenbacsi" class>
          <v-list-item-action>
            <v-icon small>fas fa-user-tag</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Phân quyền bác sĩ</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item dense router to="/PrintHeader" class>
          <v-list-item-action>
            <v-icon small>fas fa-print</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Mẫu in kết quả</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <!-- <v-chip color="yellow darken-3" right small>Xong</v-chip> -->
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      value: 0,
      interval: {}
    };
  },
  computed: {
    ...mapState("ui", ["openDrawer", "theme"]),
    ...mapGetters("ui", ["drawer"]),
    ...mapGetters("user", ["authenticated", "user"]),
    drawerNav: {
      set(drawer) {
        return drawer;
      },
      get() {
        return this.drawer;
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  mounted() {
    this.interval = setInterval(() => {
      if (this.value === 60) return (this.value = 0);
      this.value++;
    }, 1000);
  }
};
</script>

<style lang="scss">
.theme--light.v-navigation-drawer.nav {
  background: #30a399;
}
.theme--dark.v-list.list-router {
  background: #1c4c7b !important;
}
.theme--dark.v-navigation-drawer.nav {
  background-color: #1c4c7b;
}
.logo {
  color: orangered;
  font-size: 1.3rem;
  margin: 10px;
  padding: 0;
  font-weight: 700;
  text-align: center;
}
.v-application p {
  margin-bottom: 0;
}
.v-navigation-drawer__content {
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
}
  ::-webkit-scrollbar{
    display: none !important;
  };
</style>