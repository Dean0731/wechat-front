import Vue from 'vue';
import router from './routers/router.js';
import App from './App.vue';
import ViewUI from 'view-design';
import VueCookie from 'vue-cookie'
import 'view-design/dist/styles/iview.css';
import './assets/css/mycss.css';

import {NICK_NAME} from "./assets/js/const"
Vue.use(ViewUI)
Vue.use(VueCookie)   // 挂在在全局
router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    VueCookie.delete(NICK_NAME)
  }
  console.log("xxxx")
  let user = VueCookie.get(NICK_NAME)
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})
// eslint-disable-next-line no-unused-vars
new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
