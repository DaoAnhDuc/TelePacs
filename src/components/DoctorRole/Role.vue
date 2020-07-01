<template>
  <v-card style="position:relative">
    <v-card-title>
      <span class="headline" v-if="doctor.name">{{doctor.name}}</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-checkbox
          v-for="i in listRole"
          v-model="i.selected"
          :key="i.name"
          class="mx-2"
          :label="i.name"
        ></v-checkbox>
        <v-btn color="success" block @click="onSave">Lưu</v-btn>
      </v-container>
    </v-card-text>
    <v-btn class="mx-2 closeForm" fab dark icon small color="error" @click="onCloseForm">
      <v-icon dark>fas fa-times</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { TOAST_NOTIFICATION } from "../../utils";
export default {
  data() {
    return {
      roles: this.getListRoleAction
    };
  },
  computed: {
    ...mapGetters("user", ["authenticated"]),
    ...mapState("doctorRole", ["listRole", "openDialogRole", "doctor"])
  },
  updated() {},
  destroyed() {
    console.log("DR ROLE DESTROYED");
  },
  methods: {
    ...mapActions("doctorRole", [
      "getListRoleAction",
      "handleChangeRoleAction",
      "sendEmail"
    ]),
    onSave() {
      this.onCloseForm();
      this.$store.state.ui.loadingPage = true;
      this.handleChangeRoleAction({
        roles: this.listRole,
        id: this.doctor.id
      })
        .then(() => {
          this.$store.state.ui.loadingPage = false;
          TOAST_NOTIFICATION("Cấp quyền thành công");
        })
        .catch(error => {
          if (error.response) {
            this.$store.state.ui.loadingPage = false;
            TOAST_NOTIFICATION("Cấp quyền thất bại", "error");
          }
        });
      this.sendEmail({
        roles: this.listRole,
        email: this.doctor.email
      });
    },
    onCloseForm() {
      this.$store.state.doctorRole.openModal = false;
    }
  }
};
</script>
<style>
.closeForm {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
