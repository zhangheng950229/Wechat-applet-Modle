import http from '../utils/http.js'
import config from '../env/config.js'

const URL = config.api_server_url

module.exports = {
  //咖啡机接口
  //查询设备列表
  getDeviceList: (params) => http.post(URL + '/coffee/device/find', { data: params }),
  //查询设备详情
  getDeviceDetail: (params) => http.post(URL + '/coffee/device/detail', { data: params }),
  //修改设备
  editDevice: (params) => http.post(URL + '/coffee/device/edit', { data: params }),
  //查询订单列表或详情
  getOrder: (params) => http.post(URL + '/coffee/order/find', { data: params }),
}