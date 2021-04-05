import axios from "axios";
import VueCookie from 'vue-cookie'

const instance = axios.create({
    baseURL:"http://wechat.dean0731.top/",

});
instance.interceptors.request.use(function (config) {
    const token = VueCookie.get("wechat_token")
    config.params = {
        wechat_token: token,
        ...config.params
    }
    return config;
}, function (error) {
    return Promise.reject(error);
})
export default instance
