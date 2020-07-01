<template>
  <v-card>
    <v-card-title class="headline">Thông báo</v-card-title>
    <v-card-text class="delete-doctor">Bạn có chắc muốn xóa {{doctor.name}}</v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="success darken-1" class="mr-10" text @click="onDeleteSuccess">Đồng ý</v-btn>
      <v-btn color="error darken-1" text @click="onCloseForm">Hủy bỏ</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { TOAST_NOTIFICATION } from "../../utils/index";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState("doctorRole", ["openDialogDelete", "doctor"]),
    ...mapGetters("user", ["authenticated"])
  },
  methods: {
    ...mapActions("doctorRole", ["deleteDoctorAction", "getDoctorsAction"]),
    onCloseForm() {
      this.$store.state.doctorRole.openModal = false;
    },
    onDeleteSuccess() {
      this.onCloseForm();
      this.$store.state.ui.loadingPage = true;
      this.deleteDoctorAction(this.doctor.id).then(() => {
        this.getDoctorsAction({
          Keyword: "",
          PageIndex: 1,
          PageSize: 5
        }).then(() => {
          this.$store.state.ui.loadingPage = false;
          TOAST_NOTIFICATION("Xóa bác sĩ thành công", "success");
        });
      });
    }
  }
};
</script>

<style>
</style>