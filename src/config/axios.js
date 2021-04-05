import axios from "axios";
import VueCookie from 'vue-cookie'
import {TOKEN} from "./const";

const instance = axios.create({
    baseURL:"https://wechat.dean0731.top/",

});
instance.interceptors.request.use(function (config) {
    const token = VueCookie.get(TOKEN)
    config.params = {
        wechat_token: token,
        ...config.params
    }
    return config;
}, function (error) {
    return Promise.reject(error);
})
export default instance
