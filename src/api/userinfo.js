import request from '@/utils/request'
export function getInfo(token) {
  return request({
    url: '/api/userinfo/info',
    method: 'get',
    params: { token }
  })
}
export function countUserInfo(data) {
  return request({
    url: '/api/userinfo/count/' + data,
    method: 'get'
  })
}
