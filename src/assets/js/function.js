import {URL_TOKEN, NICK_NAME, TOKEN, URL_LOGIN, URL_SERVICE, URL_CHECK_TOKEN} from "./const"
import axios from 'axios';
import $ from "jquery"
import VueCookie from 'vue-cookie'
export function checkToken(){
    let ret = null;
    $.get({
        url: URL_CHECK_TOKEN,
        async: false,
        success: function(data) {
            ret = data;
        }
    });
    return ret;
}
export function getToken(nickanme,password){
    let ret = null;
    $.post({
        url: URL_SERVICE+URL_TOKEN,
        data: {"nickname":nickanme,"password":password},
        dataType: "json",
        async: false,
        success: function(data) {
            ret = data;
        }
    });
    return ret;
}

export function permssion(vue){
    let localname = VueCookie.get(NICK_NAME)
    if(localname=="" || localname ==null){
        vue.$router.push(URL_LOGIN)
        return;
    }
    let localToken = VueCookie.get(TOKEN)
    if(localToken=="" || localToken== null){
        let res = getToken(localname,null)
        let [flag,data] = checkResponse(res)
        if(flag){
            updateCookies(data)
        }else{
            VueCookie.delete(NICK_NAME)
            vue.$router.push(URL_LOGIN)
        }
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
export function logout(vue){
    axios.delete(URL_TOKEN).then(response=>{
       let [flag,data] = checkResponse(response,true)
       if (flag){
           VueCookie.delete(NICK_NAME)
           VueCookie.delete(TOKEN)
           vue.$router.push(URL_LOGIN)
       } else {
           alert(data)
       }
    });
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
