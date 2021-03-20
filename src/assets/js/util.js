import Cookies from "js-cookies/src/cookies";
function getCookies(key){
    return Cookies.get(key);
}

function setCookies(key,value,expire){
    Cookies.set(key,value,expire)
}
function changeUrl(url){
    window.location.href = url;
}
function clearCookies(key){
    return Cookies.set(key,"",-1);
}
function isEmpty(obj){
    if(obj==""){
        return true;
    }else if(obj==null){
        return true;
    }else if(obj==undefined){
        return true
    }
    return false;
}
module.exports={getCookies, setCookies, changeUrl, clearCookies, isEmpty}