import http from '../utils/http.js'
import config from '../env/config.js'

const URL = config.api_server_url

module.exports = {
  //静默登录
  slientLogin: (params) => http.post(URL + '/user/fastLogin', { data: params }),
  //登录
  login: (params) => http.post(URL + '/user/login', { data: params }),
  //退出登录
  logout: (params) => http.post(URL + '/user/logout', { data: params }),
  //校验token有效性
  verify: (params) => http.post(URL + '/common/token/verify', { data: params }),
  //获取省市区
  getProvinceList: (params) => http.post(URL + '/common/addressDict', { data: params }),
  //获取设备总数
  getDeviceNum: (params) => http.post(URL + '/common/deviceTotal', { data: params }),
}