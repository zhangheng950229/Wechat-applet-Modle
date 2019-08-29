import http from '../utils/http.js'
import config from '../env/config.js'

const URL = config.api_server_url

module.exports = {
  //充电宝接口
  //查询设备列表
  getDeviceList: (params) => http.post(URL + '/battery/device/list', { data: params }),
  //查询设备详情
  getDeviceDetail: (params) => http.post(URL + '/battery/device/detail', { data: params }),
  //修改设备
  editDevice: (params) => http.post(URL + '/battery/device/update', { data: params }),
  //查询订单列表
  getOrderList: (params) => http.post(URL + '/battery/order/list', { data: params }),
  //查询订单详情
  getOrderDetail: (params) => http.post(URL + '/battery/order/detail', { data: params }),
}