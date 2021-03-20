import {getCookies, setCookies, changeUrl, clearCookies, isEmpty} from "./util";
import axios from 'axios';
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
    let localname = getCookies(NICK_NAME)
    if(localname=="" || localname ==null){
        changeUrl("/")
    }
    let localToken = getCookies(TOKEN)
    if(localToken=="" || localToken== null){
        let res = getToken(localname,null)
        let [flag,data] = checkResponse(res)
        if(flag){
            updateCookies(data)
        }else{
            clearCookies(NICK_NAME)
            changeUrl(URL_LOGIN)
        }
    }
}
function updateCookies(data){
    setCookies(TOKEN,data.token,{ expires: new Date(data.expireTime) })
    setCookies(NICK_NAME,data.userInfo.nickname,{ expires: 30 })
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
        clearCookies(TOKEN)
        changeUrl(URL_LOGIN)
    }else {
        return [false,errmsg]
    }
}
function logout(){
    axios.delete(URL_TOKEN).then(response=>{
       let [flag,data] = checkResponse(response,true)
       if (flag){
           clearCookies(NICK_NAME)
           clearCookies(TOKEN)
           changeUrl(URL_LOGIN)
       } else {
           alert(data)
       }
    });
}