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
import {URL_SERVICE} from "./assets/js/const";
Vue.prototype.$qs = qs
Vue.prototype.$token = VueCookie.get("wechat_token");
axios.defaults.baseURL = URL_SERVICE;
axios.interceptors.request.use(function (config) {
  const token = VueCookie.get("wechat_token")
    config.params = {
      wechat_token: token,
      ...config.params
    }
  return config;
}, function (error) {
  return Promise.reject(error);
})

Vue.prototype.$axios = axios
Vue.prototype.$cookies = VueCookie
Vue.prototype.dateFormat = function(date){
  return moment(Number(date)).format('YYYY-MM-DD HH:mm:ss');
}
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
