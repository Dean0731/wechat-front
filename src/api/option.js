import request from '@/utils/request'
export function getSetting() {
  return request({
    url: '/api/opt/all',
    method: 'get'
  })
}
export function fetchList(params) {
  return request({
    url: '/api/opt',
    method: 'get',
    params
  })
}
export function deleteOpt(idList) {
  return request({
    url: '/api/opt',
    method: 'delete',
    params: { idList }
  })
}
export function createOpt(data) {
  return request({
    url: '/api/opt',
    method: 'post',
    data
  })
}
export function updateOpt(data) {
  return request({
    url: '/api/opt',
    method: 'put',
    data
  })
}
