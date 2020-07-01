<template>
  <v-card style="position: relative">
    <v-card-title>
      <span class="headline">Thay đổi thông tin bác sĩ</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-text-field label="Họ tên" v-model="doctor.name"></v-text-field>
            <v-text-field label="Email" v-model="doctor.email"></v-text-field>
            <v-text-field label="Điện thoại" type="number" v-model="doctor.phoneNumber"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="Địa chỉ" v-model="doctor.address"></v-text-field>
            <v-menu
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="computedDateFormatted"
                  label="Ngày sinh"
                  persistent-hint
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="doctor.doB" no-title></v-date-picker>
            </v-menu>
            <v-select :items="['Nam', 'Nữ', 'M', 'F']" v-model="doctor.gender" label="Giới tính"></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="2">
            <v-text-field label="CT" type="number" v-model="doctor.ct"></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field label="DX" type="number" v-model="doctor.dx"></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field label="EO" type="number" v-model="doctor.eo"></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field label="MRI" type="number" v-model="doctor.mri"></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field label="US" type="number" v-model="doctor.us"></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field label="PET" type="number" v-model="doctor.pet"></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field label="MAMO" type="number" v-model="doctor.mamo"></v-text-field>
          </v-col>
        </v-row>
        <v-btn color="success" block class="mr-10" @click="onSave">Lưu lại</v-btn>
      </v-container>
    </v-card-text>
    <v-btn class="mx-2 btnClose" fab dark icon small color="error" @click="onCloseForm">
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
      gender: ["Nữ", "Nam"]
    };
  },
  computed: {
    ...mapState("doctorRole", [
      "openDialogEdit",
      "doctor",
      "pageIndex",
      "pageSize",
      "pageCount"
    ]),
    ...mapGetters("user", ["authenticated"]),
    computedDateFormatted() {
      return this.formatDate(this.doctor.doB);
    }
  },
  methods: {
    ...mapActions("doctorRole", ["editDoctorAction", "getDoctorsAction"]),
    formatDate(date) {
      return (
        date.substr(8, 2) + "/" + date.substr(5, 2) + "/" + date.substr(0, 4)
      );
    },
    onSave() {
      this.onCloseForm();
      this.$store.state.ui.loadingPage = true;
      let { doctor } = this;
      doctor.ct = Number(this.doctor.ct);
      doctor.mri = Number(this.doctor.mri);
      doctor.dx = Number(this.doctor.dx);
      doctor.us = Number(this.doctor.us);
      doctor.eo = Number(this.doctor.eo);
      doctor.pet = Number(this.doctor.pet);
      doctor.mamo = Number(this.doctor.mamo);
      this.editDoctorAction(doctor)
        .then(() => {
          this.getDoctorsAction({
            Keyword: "",
            PageIndex: this.pageIndex,
            PageSize: this.pageSize
          }).then(() => {
            this.$store.state.ui.loadingPage = false;
            TOAST_NOTIFICATION("Sửa thành công");
          });
        })
        .catch(error => {
          if (error.response) {
            this.$store.state.ui.loadingPage = false;
            console.log("onSave -> error.response", error.response);
            let dataError = error.response.data.errors;
            if (dataError.Email) {
              for (let i = 0; i < dataError.Email.length; i++) {
                TOAST_NOTIFICATION(dataError.Email[i], "error");
              }
            } else {
              console.log(
                "onSave -> error.response",
                error.response.config.data
              );
              TOAST_NOTIFICATION("Sửa thất bại", "error");
            }
          }
        });
    },
    onCloseForm() {
      this.$store.state.doctorRole.openModal = false;
    }
  },
  updated() {
    console.log("UPDATED");
  },
  destroyed() {
    console.log("DR EDIT DESTROY");
  }
};
</script>
<style>
.btnClose {
  position: absolute;
  top: 10px;
  right: 10px;
}
.v-input--radio-group__input {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
}
</style>
