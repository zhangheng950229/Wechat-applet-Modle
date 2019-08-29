// pages/navigation/navigation.js
const app = getApp();
const ajaxUtil = require('../../api/ajax-util.js');
import pageUtil from '../../utils/page-util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    batteryNum: 0,
    coffeeNum: 0,
    washerNum: 0,
    userName:'',
    hidden:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    pageUtil.checkLogin().then((data) => {
      console.log(data)
      if (data.isLogin == false) {
        wx.redirectTo({
          url: '/pages/login/login'
        })
      }else{
        ajaxUtil.getDeviceNum({}).then((res) => {
          if (res.data.code == '0000') {
            that.setData({
              batteryNum: res.data.data.battery,
              coffeeNum: res.data.data.coffee,
              washerNum: res.data.data.washer,
              userName: res.data.data.userNo,
              hidden: false
            })
          }
        })
      }
    })

  },

  logout: function () {
    console.log('退出登录')
    var token = wx.getStorageSync("token");
    ajaxUtil.logout({}).then((data) => {
      if (data.data.code == '0000') {
        wx.removeStorageSync("token");
        wx.setStorageSync("isLogin", false);
        wx.redirectTo({
          url: '/pages/login/login'
        })
      } else {
        wx.showToast({
          title: data.data.info,
          icon: 'none',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})