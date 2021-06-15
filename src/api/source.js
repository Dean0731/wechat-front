import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url: '/api/source',
    method: 'get',
    params
  })
}
export function deleteSource(idList) {
  return request({
    url: '/api/source',
    method: 'delete',
    params: { idList }
  })
}
export function createSource(data) {
  return request({
    url: '/api/source',
    method: 'post',
    data
  })
}
export function updateSource(data) {
  return request({
    url: '/api/source',
    method: 'put',
    data
  })
}
