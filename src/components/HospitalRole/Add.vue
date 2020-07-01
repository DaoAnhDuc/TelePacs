<template>
  <v-card style="position:relative">
    <v-card-title class="headline">Phân quyền bác sĩ mới</v-card-title>

    <v-card-text>
      <v-select
        :items="listDoctorNotRole"
        item-text="name"
        item-value="userID"
        v-model="doctor.id"
        @change="onChange(doctor.id)"
        label="List Doctor"
      ></v-select>
      <div v-if="doctor.id">
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
    <v-btn class="mx-2 btnClose" fab dark icon small color="error" @click="onCloseForm">
      <v-icon dark>fas fa-times</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
import { TOAST_NOTIFICATION } from "../../utils/index";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      id: null
    };
  },
  computed: {
    ...mapState("user", ["user"]),
    ...mapState("hospitalRole", [
      "openModal",
      "listDoctorNotRole",
      "doctor",
      "search"
    ])
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
    onChange(id) {
      console.log(id);
      this.$store.state.ui.loadingPage = true;
      this.getRoleDoctorById(id).then(() => {
        this.$store.state.ui.loadingPage = false;
      });
    },
    onSubmit() {
      this.onCloseForm();
      this.$store.state.ui.loadingPage = true;
      this.onSubmitListRole(this.doctor).then(() => {
        this.getListDr_HospitalRole(this.search).then(() => {
          this.$store.state.ui.loadingPage = false;
          this.$store.state.hospitalRole.doctor = {
            name: null,
            id: null,
            listRole: []
          };
          TOAST_NOTIFICATION("Thành công");
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