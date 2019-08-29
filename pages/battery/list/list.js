const app = getApp();
const batteryApi = require('../../../api/batteryApi.js');
// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeArr: [
      {
        id: '',
        name: '全部'
      },
      {
        id: '1',
        name: '可用'
      },
      {
        id: '0',
        name: '不可用'
      }
    ],
    typeIndex: 0,
    dataArray: [],
    devNo: '',
    currentPage: 1,
    // scrollHeight: 0,
    loadComplete: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // wx.getSystemInfo({
    //   success: function (res) {
    //     console.log(res)
    //     that.setData({
    //       scrollHeight: res.windowHeight - 120
    //     });
    //   }
    // });

    this.loadInitData()
  },

  getType: function (e) {
    this.setData({
      typeIndex: e.detail.value
    })
  },
  getDevNo: function (e) {
    this.setData({
      devNo: e.detail.value
    })
  },
  loadInitData: function () {
    var that = this
    var currentPage = 1
    var tips = "加载第" + (currentPage) + "页";
    console.log("load page " + (currentPage));
    wx.showLoading({
      title: tips,
    })
    // 刷新时，清空dataArray，防止新数据与原数据冲突
    that.setData({
      dataArray: []
    })
    batteryApi.getDeviceList({ 'pageNo': currentPage, 'pageSize': 10, 'status': that.data.typeArr[that.data.typeIndex].id, 'devNo': that.data.devNo }).then((res) => {
      wx.hideLoading();
      if(res.data.code=='0000'){
        var data = res.data; // 接口相应的json数据
        var devices = data.data; // 接口中的data对应了一个数组，这里取名为 devices
        var totalDataCount = devices.length;
        that.setData({
          ["dataArray[" + (currentPage - 1) + "]"]: devices,
          currentPage: currentPage,
          totalDataCount: totalDataCount
        })
      }else{
        wx.showToast({
          title: res.data.info,
          icon: 'none',
        })
      }
    })

  },

  bindDownLoad: function () {
    var that = this
    if (that.data.loadComplete) {
      return
    }
    var currentPage = that.data.currentPage; // 获取当前页码
    currentPage += 1; // 加载当前页面的下一页数据
    var tips = "加载第" + (currentPage) + "页";
    console.log("load page " + (currentPage));
    wx.showLoading({
      title: tips,
    })
    batteryApi.getDeviceList({ 'pageNo': currentPage, 'pageSize': 10 }).then((res) => {
      wx.hideLoading();
      if(res.data.code=='0000'){
        var data = res.data; // 接口相应的json数据
        var devices = data.data; // 接口中的data对应了一个数组，这里取名为 devices
        var totalDataCount = devices.length;
        if (totalDataCount == 0) {
          that.setData({
            loadComplete: true
          })
        }
        that.setData({
          ["dataArray[" + (currentPage - 1) + "]"]: devices,
          currentPage: currentPage,
          totalDataCount: totalDataCount
        })
      }else{
        wx.showToast({
          title: res.data.info,
          icon: 'none',
        })
      }
      
    })
  },

  search: function () {
    this.loadInitData()
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