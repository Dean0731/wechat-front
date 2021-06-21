import request from '@/utils/request'

export function fetchSite(id) {
  return request({
    url: '/api/site/' + id,
    method: 'get'
    // params: { id }
  })
}

export function fetchList(params) {
  return request({
    url: '/api/site',
    method: 'get',
    params
  })
}
export function deleteSite(idList) {
  return request({
    url: '/api/site',
    method: 'delete',
    params: { idList }
  })
}
export function createSite(data) {
  return request({
    url: '/api/site',
    method: 'post',
    data
  })
}
export function updateSite(data) {
  return request({
    url: '/api/site',
    method: 'put',
    data
  })
}
