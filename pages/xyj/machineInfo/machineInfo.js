// pages/list/list.js
let washerApi = require('../../../api/washerApi.js');



Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '状态',
    typeArr: ['空闲', '工作中', '离线', '故障'],
    showModle: false,
    currentPage: 1,
    deviceInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.data.deviceInfo.devNo = options.devNo;
    washerApi.getDeviceDetail({ 'devNo': options.devNo}).then((res)=>{
      if(res.data.code=='0000'){
        that.setData({
          deviceInfo: res.data.data
        })
      }else{
        wx.showToast({
          title: res.data.info,
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