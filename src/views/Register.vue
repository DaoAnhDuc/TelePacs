<template>
  <div class="register">
    <v-card class="card-register" width="600">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2>Đăng ký tài khoản</h2>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="registerUser.name" label="Họ tên" required></v-text-field>
            <v-select :items="gender" v-model="registerUser.gender" label="Giới tinh"></v-select>
            <v-menu
              v-model="menu2"
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
              <v-date-picker v-model="registerUser.doB" no-title @input="menu2 = false"></v-date-picker>
            </v-menu>
            <v-text-field v-model="registerUser.address" label="Địa chỉ" required></v-text-field>
            <v-text-field v-model="registerUser.phoneNumber" label="Số điện thoại" required></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="registerUser.email" label="Email" required></v-text-field>
            <v-text-field v-model="registerUser.userName" label="Tên đăng nhập" required></v-text-field>
            <v-text-field
              v-model="registerUser.password"
              :type="'password'"
              hint="Mật khẩu bao gồm 1 chữ hoa, 1 ký tự đặc biệt"
              label="Mật khẩu"
              required
            ></v-text-field>
            <v-text-field
              v-model="registerUser.confirmPassword"
              :type="'password'"
              label="Nhập lại mật khẩu"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <div class="btn-register">
          <v-btn color="#039BE5" class="text--white" block @click="onRegister">Đăng ký</v-btn>
        </div>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import {TOAST_NOTIFICATION} from '../utils/index'
export default {
  data: vm => {
    return {
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu2: false,
      registerUser: {
        name: "",
        gender: "",
        address: "",
        doB: new Date().toISOString().substr(0, 10),
        email: "",
        phoneNumber: "",
        userName: "",
        password: "",
        confirmPassword: ""
      },
      gender: ["Nam", "Nữ"]
    };
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.registerUser.doB);
    }
  },

  methods: {
    ...mapActions("user", ["handleRegister"]),
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    onRegister() {
      this.handleRegister(this.registerUser)
        .then(() => {
          this.$router.replace("/");
        })
        .catch(error => {
          if (error.response.data.errors) {
            console.log("onRegister -> error.response", error.response);
            let errData = error.response.data.errors;
            console.log("onRegister -> errData", errData)
            if(errData.Name){
              errData.Name.forEach(err => {
                TOAST_NOTIFICATION(err, 'error')
              });
            }
            if(errData.UserName){
              errData.UserName.forEach(err => {
                TOAST_NOTIFICATION(err, 'error')
              });
            }
            // if(errData.Email){
            //   errData.Email.forEach(err => {
            //     TOAST_NOTIFICATION(err, 'error')
            //   });
            // }
            // if(errData.Password){
            //   errData.Password.forEach(err => {
            //     TOAST_NOTIFICATION(err, 'error')
            //   });
            // }
            
          }else{
            console.log("onRegister -> error.response", error.response);
            TOAST_NOTIFICATION("Thất bại", 'error');
          }
        });
    }
  }
};
</script>

<style>
.register {
  width: 100%;
  height: calc(100vh - 48px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-register {
  padding: 15px 20px;
}
</style>