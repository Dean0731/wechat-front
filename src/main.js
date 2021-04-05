import Vue from 'vue';
import router from './routers/router.js';
import App from './App.vue';
import VueCookie from 'vue-cookie'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "@/assets/css/reset.css"
import moment from "moment";
import qs from 'qs'
import axios from "./config/axios"
import {TOKEN} from "./config/const";

Vue.prototype.$qs = qs
Vue.prototype.$token = VueCookie.get(TOKEN);
Vue.prototype.$axios = axios
Vue.prototype.$cookies = VueCookie

Vue.prototype.dateFormat = function(date){
  if(date.toString().length==13){
    return moment(Number(date)).format('YYYY-MM-DD HH:mm:ss');
  }else if(date.toString().length==10) {
    return moment.unix(Number(date)).format('YYYY-MM-DD HH:mm:ss');
  }
  return "time formate error!"
}
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
