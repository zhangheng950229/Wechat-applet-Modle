//app.js
const ajaxUtil = require('api/ajax-util.js')
const pageUtil = require('./utils/page-util.js')
import WxRequest from './assets/plugins/wx-request/lib/index'
import WxValidate from './assets/plugins/wx-validate/WxValidate'
import WxService from './assets/plugins/wx-service/WxService'
import http from './utils/http.js'

App({
  onLaunch: function () {
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //console.log(res.code);
          ajaxUtil.slientLogin({ "code": res.code }).then((result) => {
            if (result.data.code == '0000' && result.data.data.token != null) {
              wx.setStorageSync("token", result.data.data.token);
              if (result.data.data.isBind) {
                wx.setStorageSync("isLogin", true);
              } else {
                wx.setStorageSync("isLogin", false);
              }
              wx.getUserInfo({
                success: function (data) {
                  // 自定义操作
                  // 绑定数据，渲染页面
                  //console.log(data);
                  that.globalData.userInfo = data.userInfo;
                }
              })
            } else {
              // openId为空
            }
          })
        } else {
          //console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    StaticImg: '../../assets/images',
  }
})
var timer = function() {
  setTimeout(function() {
    console.log(1111);
    timer()
  },1000)
}
