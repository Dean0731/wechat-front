import VueRouter from 'vue-router';
import MESSAGELIST from "../components/page/MessageList"
import MESSAGSEND from "../components/page/MessageSend"
import DASHBOARD from "../components/page/DashBoard"
import Login from "../components/Login"
import Home from "../components/Home"
import Vue from 'vue';
import {URL_DASHBOARD, URL_HOME, URL_LOGIN, URL_MESSAGE_LIST, URL_MESSAGE_SEND} from "@/assets/js/const";
Vue.use(VueRouter);
const routes = [
    { path:"/",redirect:URL_HOME},
    { path: URL_HOME, component:Home,children:[
            { path:"/",redirect:URL_DASHBOARD},
            { path: URL_MESSAGE_LIST, component: MESSAGELIST },
            { path: URL_MESSAGE_SEND, component: MESSAGSEND },
            { path: URL_DASHBOARD, component: DASHBOARD },
        ]
    },
    { path: URL_LOGIN, component: Login },
]

export default new VueRouter({
    routes // (缩写) 相当于 routes: routes
})


