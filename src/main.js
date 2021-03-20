import Vue from 'vue';
import router from './routers/router.js';
import App from './App.vue';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import './assets/css/mycss.css';


Vue.use(ViewUI)
// eslint-disable-next-line no-unused-vars
new Vue({
  router,
  render: h => h(App)
}).$mount("#app")