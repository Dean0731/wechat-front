import {NICK_NAME, TOKEN, URL_CHECK_TOKEN, URL_MESSAGE, URL_MESSAGE_COUNT, URL_TOKEN} from "./const";
import {checkResponse, updateCookies, urlJoinParam} from "./function";
import {URL_HOME, URL_LOGIN} from "../routers/router";
import VueCookie from "vue-cookie";
import {errorMessage, successMessage} from "../components/util/messageUtil";
export function getMessageTotal(vue){
    vue.$axios.get(URL_MESSAGE_COUNT)
        .then(response=>{
                let[flag,data]  = checkResponse(response,true,vue)
                if(flag){
                    vue.total = data;
                }
            }
        )
}
export function getMessage(pageNumber,vue){
    if (pageNumber==null){
        pageNumber=1
    }
    vue.$axios.get(urlJoinParam(URL_MESSAGE,{"pageNumber":pageNumber,}))
        .then(response=>{
                let [flag,data] = checkResponse(response,true,vue)
                if(flag){
                    vue.message = data.messageList;
                    vue.page = data.page;
                }
            }
        ).catch(res=>{
        vue.$message(errorMessage(res))
    })
}
export function deleteMessage(row,data,vue){
    vue.$axios.delete(URL_MESSAGE,data).then(res=>{
        let [flag,data] = checkResponse(res,true)
        if(flag){
            vue.message.splice(row,1);
            vue.$message(successMessage("delete success"))
        }else{
            vue.$message(errorMessage(data))
        }
    })
}
export function login(data,vue){
    vue.$axios.post(URL_TOKEN, data,).then(res => {
        let [flag, data] = checkResponse(res, true)
        if (flag) {
            updateCookies(data)
            vue.$router.push(URL_HOME)
        } else {
            vue.$message({
                message: data,
                type: 'error'
            })
            vue.$refs.dis = false;
        }
    })
}
export function logout(vue){
    vue.$axios.delete(URL_TOKEN).then(response=>{
        let [flag,data] = checkResponse(response,true)
        if (flag){
            VueCookie.delete(NICK_NAME)
            VueCookie.delete(TOKEN)
            vue.$router.push(URL_LOGIN)
        } else {
            vue.$message(errorMessage(data))
        }
    });
}
export function sendMessage(data,vue){
    vue.$axios.post(URL_MESSAGE,data,).then(function (response){
        let [flag,data] = checkResponse(response,true,vue)
        if(flag){
            vue.$message(successMessage("send message success!"))
        }else{
            vue.$message(errorMessage(data))
        }
    })
}

export function checkToken(vue){
    vue.$axios.get(URL_CHECK_TOKEN).then(res=>{
        checkResponse(res,true,vue)
    })

}
export function getToken(data,vue){
    vue.$axios.post(URL_TOKEN,data).then(res=>{
        let [flag,data] = checkResponse(res,true,vue)
        if(flag){
            updateCookies(data)
        }else{
            VueCookie.delete(NICK_NAME)
            vue.$router.push(URL_LOGIN)
        }
    })
}
