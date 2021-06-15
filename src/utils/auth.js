import Cookies from 'js-cookie'

const TokenKey = 'wechat_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token, time) {
  if (time == null) {
    return Cookies.set(TokenKey, token)
  } else {
    return Cookies.set(TokenKey, token, { expires: new Date(time).toUTCString() })
  }
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
