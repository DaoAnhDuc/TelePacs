<template>
  <v-card style="position:relative">
    <v-card-title class="headline">Đổi quyền {{doctor.name}}</v-card-title>
    <v-card-text>
      <div>
        <v-checkbox
          v-for="i in doctor.listRole"
          v-model="i.selected"
          :key="i.name"
          class="mx-2"
          :label="i.name"
        ></v-checkbox>
      </div>
      <v-btn color="green" class="white--text mt-5" block @click="onSubmit">Đồng ý</v-btn>
    </v-card-text>
    <!-- <v-btn class="mx-2 btnClose" fab dark icon small color="error" @click="onCloseForm">
      <v-icon dark>fas fa-times</v-icon>
    </v-btn> -->
  </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { TOAST_NOTIFICATION } from "../../utils";
export default {
  computed: {
    ...mapState("user", ["user"]),
    ...mapState("hospitalRole", ["openModal", "dropDoctors", "doctor", "search"])
  },
  methods: {
    ...mapActions("hospitalRole", [
      "getAllDoctor",
      "getRoleDoctorById",
      "getListDr_HospitalRole",
      "onSubmitListRole"
    ]),
    onCloseForm() {
      this.$store.state.hospitalRole.openModal = false;
    },
    onSubmit() {
      this.onCloseForm();
      this.$store.state.ui.loadingPage = true;
      this.onSubmitListRole(this.doctor).then(() => {
        this.getListDr_HospitalRole(this.search).then(() => {
          this.$store.state.ui.loadingPage = false;
          TOAST_NOTIFICATION("Thành công");
          this.$store.state.hospitalRole.doctor = {
            name: null,
            id: null,
            listRole: []
          };
        });
      }).catch((err) => {
        if(err.response){
          this.$store.state.ui.loadingPage = false;
          TOAST_NOTIFICATION("Thất bại", 'error');
        }
      });
    }
  },
  created() {
    console.log("created -> created");
    this.getAllDoctor();
  }
};
</script>

<style>
</style>