import '@fortawesome/fontawesome-free/css/all.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import VueToast from 'vue-toast-notification';
// Import one of available themes
import 'vue-toast-notification/dist/theme-default.css';
//import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(VueToast);
Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'md' || 'fa',
  },
  theme: {
    dark: false
  }
});
