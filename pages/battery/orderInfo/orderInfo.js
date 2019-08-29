// pages/list/list.js
let batteryApi = require('../../../api/batteryApi.js');



Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '状态',
    typeArr: ['空闲', '工作中', '离线', '故障'],
    showModle: false,
    currentPage: 1,
    orderInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.data.orderInfo.orderNo = options.orderNo;
    batteryApi.getOrderDetail({ 'orderNo': options.orderNo}).then((res)=>{
      if(res.data.code=='0000'){
        that.setData({
          orderInfo: res.data.data
        })
      }else{
        wx.showToast({
          title: res.data.info,
          icon: 'none',
        })
      }
    })

  },

  getType: function (e) {
    console.log(e)
    this.setData({
      type: this.data.typeArr[e.detail.value]
    })
  },

  /**
   * 重置价格按钮
   */
  restPrize: function() {
    this.setData({
      showModle : true,
    })

  },

  closeModle: function() {
    this.setData({
      showModle : false,
    });
    console.log(111)
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