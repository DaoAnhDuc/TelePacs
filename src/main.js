import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import CKEditor from "@ckeditor/ckeditor5-vue";
Vue.use(CKEditor);

Vue.config.productionTip = false;
if (localStorage.getItem("token")) {
  console.log("RELOAD APP");
  store
    .dispatch("user/handleSetUserInfo", localStorage.getItem("token"))
    .then(() => {
      new Vue({
        router,
        store,
        vuetify,
        render: (h) => h(App),
        mounted() {
          // debugger;
          console.log("MAIN MOUNTED");
        },
      }).$mount("#app");
    })
}else{
  console.log("CREATE APP");
  new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
    mounted() {
      // debugger;
      console.log("MAIN MOUNTED");
    },
  }).$mount("#app");
}
