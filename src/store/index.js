import Vue from 'vue'
import Vuex from 'vuex'
import ui from './modules/ui/index'
import user from './modules/user/index';
import hospitalRole from './modules/hospitalRole/index'
import doctorRole from './modules/doctorRole/index'
import listHospital from './modules/listHospital/index'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    ui,
    user,
    listHospital,
    doctorRole,
    hospitalRole,
  }
})
