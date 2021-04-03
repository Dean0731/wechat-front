import Vue from 'vue';
import router from './routers/router.js';
import App from './App.vue';
import VueCookie from 'vue-cookie'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "@/assets/css/reset.css"
import axios from "axios";
import moment from "moment";
import qs from 'qs'
Vue.use(VueCookie)   // 挂在在全局
axios.defaults.baseURL = 'http://localhost:8005/';
axios.defaults.withCredentials = true
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.prototype.dateFormat = function(date){
  return moment.unix(Number(date)).format('YYYY-MM-DD HH:mm:ss');
}
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
