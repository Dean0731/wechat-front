import {NICK_NAME, TOKEN} from "./const"
import VueCookie from 'vue-cookie'
import {checkToken, getToken} from "./service";
import {URL_LOGIN} from "../routers/router";
export function permssion(vue){
    let localname = VueCookie.get(NICK_NAME)
    if(localname=="" || localname ==null){
        vue.$router.push(URL_LOGIN)
        return;
    }
    let localToken = VueCookie.get(TOKEN)
    if(localToken=="" || localToken== null){
        let data = {"nickname":localname,"password":null}
        getToken(data,vue)
    }else{
        checkToken(vue);
    }
}
export function updateCookies(data){
    VueCookie.set(TOKEN,data.token,{ expires :new Date(data.expireTime).toUTCString()})
    // vue.$token = data.token;
    // VueCookie.set(TOKEN,data.token,{ expires:30})
    VueCookie.set(NICK_NAME,data.userInfo.nickname,{ expires: 30 })
}
export function checkResponse(res,async,vue){
    if(async){
        res= res.data
    }
    let errcode = res.errcode;
    let errmsg = res.errmsg;
    if(errcode=="00000"){
        return [true,res.data];
    }else if(errcode=="A0230"){
        VueCookie.delete(TOKEN)
        vue.$router.push(URL_LOGIN)
    }
    return [false,errmsg]
}

export function urlJoinParam(url,params) {
    if (Object.keys(params).length != 0) {
        url = url.concat("?")
        let size = 0;
        for (let key in params) {
            size++
            url = url.concat(key).concat("=").concat(params[key])
            if (size < Object.keys(params).length) {
                url = url.concat("&")
            }
        }
    }
    return url;
}
