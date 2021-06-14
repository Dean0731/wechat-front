import request from '@/utils/request'
export function getList(params) {
  return request({
    url: '/api/message',
    method: 'get',
    params
  })
}
export function deleteMessage(msgId) {
  return request({
    url: '/api/message',
    method: 'delete',
    params: { msgId }
  })
}
export function createMessage(data) {
  return request({
    url: '/api/message',
    method: 'post',
    data
  })
}
