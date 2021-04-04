import VueRouter from 'vue-router';
import MESSAGELIST from "../components/page/MessageList"
import MESSAGSEND from "../components/page/MessageSend"
import DASHBOARD from "../components/page/DashBoard"
import Login from "../components/Login"
import Home from "../components/Home"
import Error404 from "../components/Error404"
import Vue from 'vue';
import {URL_DASHBOARD, URL_HOME, URL_LOGIN, URL_MESSAGE_LIST, URL_MESSAGE_SEND} from "./path";
Vue.use(VueRouter);
const routes = [
    { path:"/",redirect:URL_HOME},
    { path: URL_HOME, component:Home,children:[
            { path:"/",redirect:URL_DASHBOARD},
            { path: URL_MESSAGE_LIST, component: MESSAGELIST },
            { path: URL_MESSAGE_SEND, component: MESSAGSEND },
            { path: URL_DASHBOARD, component: DASHBOARD },
            {path:'*',component:Error404},
        ]
    },
    { path: URL_LOGIN, component: Login },
    {path:'*',component:Error404},
]

export default new VueRouter({
    routes // (缩写) 相当于 routes: routes
})


