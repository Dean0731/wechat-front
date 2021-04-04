import axios from "axios";
import VueCookie from 'vue-cookie'
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
// axios.defaults.baseURL=process.env.SERVICE_URL
// axios.defaults.baseURL="http://106.15.89.152:8004"
export default axios
