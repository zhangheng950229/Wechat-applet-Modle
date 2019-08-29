
const app = getApp();
const ajaxUtil = require('../../api/ajax-util.js');
import pageUtil from '../../utils/page-util.js';


// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'account': '',
    'passWord': ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // console.log(this.data);
    // console.log(app)
    pageUtil.checkLogin().then((data)=>{
      console.log(data)
      if(data.isLogin == true){
        wx.redirectTo({
          url: '/pages/navigation/navigation'
        })
      }
    })
  },

  /* 
    登录点击事件
  */
  handle: function (e) {
    console.log(this.data)
    if (this.data.account ==""){
      wx.showToast({
        title: '请输入账号',
        icon: 'none',
      })
      return
    }
    if (this.data.passWord == "") {
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
      })
      return
    }
    var token = wx.getStorageSync("token");
    ajaxUtil.login({ 'token': token, 'userNo': this.data.account, 'pwd': this.data.passWord}).then((data) => {
      if(data.data.code=='0000'){
        wx.setStorageSync("token", data.data.data.token);
        wx.setStorageSync("isLogin", true);
        wx.redirectTo({
          url: '/pages/navigation/navigation'
        })
      }else{
        wx.showToast({
          title: data.data.info,
          icon: 'none',
        })
      }
    })

  },
  getVal: function (e) {
    var key = e.target.dataset.name;
     
    if (e.target.dataset.name == "account") {
      this.setData({
        "account" : e.detail.value
      })
    } else {
      this.setData({
        "passWord" : e.detail.value
      })
    }
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