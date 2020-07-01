<template>
  <v-card class="addModal">
    <v-card-title class="headline">Thêm mới bác sĩ</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <v-text-field v-model="doctor.name" label="Họ tên" required></v-text-field>
          <v-select :items="gender" v-model="doctor.gender" label="Giới tinh"></v-select>
          <v-text-field v-model="doctor.address" label="Địa chỉ" required></v-text-field>
          <v-text-field v-model="doctor.phoneNumber" label="Số điện thoại" required></v-text-field>
          <v-menu
            :close-on-content-click="false"
            class="datepicker"
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
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="doctor.email"
            label="Email"
            hint="Email phải đúng định dạng"
            required
          ></v-text-field>
          <v-text-field v-model="doctor.userName" label="Tên đăng nhập" required></v-text-field>
          <v-text-field
            v-model="doctor.password"
            :type="'password'"
            hint="Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thương, 1 số,  1 ký tự đặc biệt, ít nhất 6 ký tự"
            label="Mật khẩu"
            required
          ></v-text-field>
          <v-text-field
            v-model="doctor.confirmPassword"
            :type="'password'"
            label="Nhập lại mật khẩu"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-btn color="success darken-1" block class="mr-10" @click="onSubmit">Đồng ý</v-btn>
      <v-btn class="mx-2 btnClose" icon fab dark small color="error" @click="onCloseForm">
        <v-icon dark>fas fa-times</v-icon>
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { TOAST_NOTIFICATION } from "../../utils/index";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      gender: ["Nam", "Nữ"],
      doctor: {
        name: "Doctor Test",
        gender: "Nam",
        phoneNumber: "0987654321",
        address: "Hà Nội",
        doB: new Date().toISOString().substr(0, 10),
        email: "anhduc2641999@gmail.com",
        userName: "doctor",
        password: "Vrpacs@123",
        confirmPassword: "Vrpacs@123"
      }
    };
  },
  computed: {
    ...mapState("doctorRole", [""]),
    computedDateFormatted() {
      return this.formatDate(this.doctor.doB);
    }
  },
  methods: {
    ...mapActions("doctorRole", ["addNewDoctorAction", "getDoctorsAction"]),
    onCloseForm() {
      this.$store.state.doctorRole.openModal = false;
    },
    onSubmit() {
      this.onCloseForm();
      this.$store.state.ui.loadingPage = true;
      this.addNewDoctorAction(this.doctor)
        .then(() => {
          this.getDoctorsAction({
            Keyword: "",
            PageIndex: 1,
            PageSize: 5
          }).then(() => {
            this.$store.state.ui.loadingPage = false;
            TOAST_NOTIFICATION("Thêm bác sĩ thành công", "success", 3000);
          });
        })
        .catch(error => {
          if (error.response) {
            this.$store.state.ui.loadingPage = false;
            console.log("onSubmit -> error.response", error.response.data);
            let dataError = error.response.data;
            if (dataError.message) {
              TOAST_NOTIFICATION(dataError.message, "error", 4000);
            }
            if (dataError.errors.Email) {
              for (let i = 0; i < dataError.errors.Email.length; i++) {
                TOAST_NOTIFICATION(dataError.errors.Email[i], "error", 4000);
              }
            }
            if (dataError.errors.Password) {
              for (let i = 0; i < dataError.errors.Password.length; i++) {
                TOAST_NOTIFICATION(dataError.errors.Password[i], "error", 4000);
              }
            }
            if (dataError.errors.ConfirmPassword) {
              for (
                let i = 0;
                i < dataError.errors.ConfirmPassword.length;
                i++
              ) {
                TOAST_NOTIFICATION(
                  dataError.errors.ConfirmPassword[i],
                  "error",
                  4000
                );
              }
            }
          }
        });
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
  }
};
</script>

<style lang="scss">
.v-date-picker-table.theme--light {
  .theme--light.v-btn {
    color: #000;
  }
}
.addModal {
  .btnClose {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .theme--dark.v-sheet {
    background-color: #19344e;
    border-color: #19344e;
    color: #ffffff;
  }
  .theme--dark.v-picker__body {
    background: #00838f;
  }
}
</style>