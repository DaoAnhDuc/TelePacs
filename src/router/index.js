import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login";
import Dashboard from "../views/Dashboard";
import DoctorRole from "../views/DoctorRole";
import HospitalRole from "../views/HospitalRole";
import Register from "../views/Register";
import store from "../store/index";
Vue.use(VueRouter);

const routes = [
  {
    path: "/Login",
    name: "Login",
    component: Login,
    beforeEnter: (to, from, next) => {
      store.dispatch("user/handleLogout");
      next();
    },
  },
  {
    path: "/Register",
    name: "Register",
    component: Register,
    beforeEnter: (to, from, next) => {
      if (!store.getters["user/getIsAdmin"]) {
        return next({
          name: "Login",
        });
      }
      next();
    },
  },
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if (!store.getters["user/authenticated"]) {
        return next({
          name: "Login",
        });
      }
      next();
    },
  },
  {
    path: "/HospitalRole",
    name: "HospitalRole",
    component: HospitalRole,
    beforeEnter: (to, from, next) => {
      if (!store.getters["user/authenticated"]) {
        return next({
          name: "Login",
        });
      }
      if (!store.getters["user/getIsAdmin"]) {
        return next({
          name: "Dashboard",
        });
      }
      next();
    },
  },
  {
    path: "/DoctorRole",
    name: "DoctorRole",
    component: DoctorRole,
    beforeEnter: (to, from, next) => {
      if (!store.getters["user/authenticated"]) {
        return next({
          name: "Login",
        });
      }
      if (!store.getters["user/getIsAdmin"]) {
        return next({
          name: "Dashboard",
        });
      }
      next();
    },
  },
  {
    path: "*",
    name: "NotFound",
    component: Login,
    beforeEnter: (to, from, next) => {
      store.dispatch("user/handleLogout");
      return next({
        name: "Login",
      });
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
