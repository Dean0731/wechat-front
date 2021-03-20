import VueRouter from 'vue-router';
import MESSAGELIST from "../components/MessageList"
import MESSAGSEND from "../components/MessageSend"
import DASHBOARD from "../components/DashBoard"
import LOGIN from "../components/Login"
import Vue from 'vue';
Vue.use(VueRouter);

const routes = [
    { path: '/login', component: LOGIN },
    { path: '/message/list', component: MESSAGELIST },
    { path: '/message/send', component: MESSAGSEND },
    { path: '/dashboard', component: DASHBOARD },
]

const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})

export default  router
