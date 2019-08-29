import http from '../utils/http.js'
import config from '../env/config.js'

const URL = config.api_server_url

module.exports = {
  //洗衣机接口
  //查询设备列表
  getDeviceList: (params) => http.post(URL + '/washer/device/main', { data: params }),
  //查询设备详情
  getDeviceDetail: (params) => http.post(URL + '/washer/device/detail', { data: params }),
  //修改设备
  editDevice: (params) => http.post(URL + '/washer/device/editPackage', { data: params }),
  //修改所有设备
  editAllDevice: (params) => http.post(URL + '/washer/device/editAllPackage', { data: params }),
  //查询订单列表或详情
  getOrder: (params) => http.post(URL + '/washer/order/find', { data: params }),
}