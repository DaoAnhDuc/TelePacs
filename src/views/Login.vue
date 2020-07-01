<template>
  <div class="wrapper-card-login" elevation-1>
    <div class="form-login">
      <v-container>
        <!-- <h2 class="text-center black--text">Login</h2> -->
        <v-row class="flex-box-login">
          <v-col cols="4">
            <v-img src="assets/img/logo.png"></v-img>
          </v-col>
          <v-col cols="10">
            <v-text-field
              v-model="login.userName"
              @keyup.13="onLogin"
              prepend-inner-icon="fas fa-user-circle"
              label="Tên đăng nhập"
            ></v-text-field>
          </v-col>
          <v-col cols="10">
            <v-text-field
              v-model="login.password"
              @keyup.13="onLogin"
              :type="'password'"
              prepend-inner-icon="fas fa-unlock-alt"
              label="Mật khẩu"
            ></v-text-field>
          </v-col>
          <v-col cols="10" style="display:none">
            <v-checkbox
              style="padding: 0; margin:0"
              v-model="login.rememberMe"
              label="Lưu lại"
              required
            ></v-checkbox>
          </v-col>
          <v-col cols="10" class="center">
            <v-btn
              depressed
              small
              block
              color="blue darken-2"
              @click="onLogin"
              class="text-center white--text"
            >Đăng nhập</v-btn>
          </v-col>
          <!-- <v-col cols="6" class="center-button">
            <v-btn depressed small color="error" @click="onRegister" class="text-center">Đăng ký</v-btn>
          </v-col>-->
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters("user", ["authenticated", "messageLoginError", "user"]),
    ...mapState("user", ["login"])
  },
  methods: {
    ...mapActions("user", ["handleLogin", "handleSetUserInfo"]),
    ...mapActions("ui", ["toggleNavBar", "openNavBar"]),
    onLogin() {
      console.log("login");
      this.$store.state.ui.loadingPage = true;
      this.handleLogin(this.login)
        .then(() => {
          if (this.user) {
            this.$store.state.ui.loadingPage = false;
            this.openNavBar();
            this.$router.replace("/");
          }
        })
        .catch(error => {
          if (error.response) {
            this.$store.state.ui.loadingPage = false;
            console.log("LOGIN FAIL", error.response);
            if (error.response.status === 400) {
              this.$toast.open({
                message: "Tên đăng nhập hoặc mật khẩu không đúng !",
                type: "error",
                position: "top",
                duration: 2000,
                pauseOnHover: true,
                dismissible: false
              });
            } else if (error.response.status === 403) {
              this.$toast.open({
                message: "Tài khoản của bạn chưa được cấp quyền !",
                type: "error",
                position: "top",
                duration: 2000
              });
            }
          }
        });
    }
  }
};
</script>

<style>
.wrapper-card-login {
  width: 100%;
  height: calc(100vh - 52px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.txt-login {
  text-align: center;
  font-size: 1.5rem;
  margin-top: 1rem;
  font-weight: 500;
}
.form-login {
  box-shadow: 0px 10px 13px -6px rgba(0, 0, 0, 0.2),
    0px 20px 31px 3px rgba(0, 0, 0, 0.14), 0px 8px 38px 7px rgba(0, 0, 0, 0.12) !important;
  max-width: 320px;
  min-height: 250px;
  border-radius: 5px;
}
.flex-box-login {
  display: flex;
  justify-content: center;
}
.center-button {
  display: flex;
  justify-content: center;
}
input:-internal-autofill-selected {
  -webkit-appearance: menulist-button;
  background-color: red !important;
  background-image: none !important;
}
</style>