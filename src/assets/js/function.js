import {URL_CHECK_TOKEN,URL_TOKEN,NICK_NAME,TOKEN} from "./const"
import axios from 'axios';
import $ from "jquery"
import VueCookie from 'vue-cookie'
function checkToken(){
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
function getToken(nickanme,password){
    let ret = null;
    $.post({
        url: URL_TOKEN,
        data: {"nickname":nickanme,"password":password},
        dataType: "json",
        async: false,
        success: function(data) {
            ret = data;
        }
    });
    return ret;
}

function permssion(){
    let localname = VueCookie.get(NICK_NAME)
    if(localname=="" || localname ==null){
        console.log("localname=null")
    }
    let localToken = VueCookie.get(TOKEN)
    if(localToken=="" || localToken== null){
        let res = getToken(localname,null)
        let [flag,data] = checkResponse(res)
        if(flag){
            updateCookies(data)
        }else{
            VueCookie.delete(NICK_NAME)

        }
    }
}
function updateCookies(data){
    VueCookie.set(TOKEN,data.token,{ expires: new Date(data.expireTime) })
    VueCookie.set(NICK_NAME,data.userInfo.nickname,{ expires: 30 })
}
function checkResponse(res,async){
    if(async){
        res= res.data
    }
    let errcode = res.errcode;
    let errmsg = res.errmsg;
    if(errcode=="00000"){
        return [true,res.data];
    }else if(errcode=="A0230"){
        VueCookie.delete(TOKEN)
    }else {
        return [false,errmsg]
    }
}
function logout(){
    axios.delete(URL_TOKEN).then(response=>{
       let [flag,data] = checkResponse(response,true)
       if (flag){
           VueCookie.delete(NICK_NAME)
           VueCookie.delete(TOKEN)
       } else {
           alert(data)
       }
    });
}
export  {checkToken,logout,checkResponse,permssion}
