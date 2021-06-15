import request from '@/utils/request'
import qs from 'qs'
export function login(data) {
  data = qs.stringify(data)
  return request({
    url: '/api/token',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/userinfo/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/api/token',
    method: 'delete'
  })
}