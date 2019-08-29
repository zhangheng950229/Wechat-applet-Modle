const app = getApp();
const batteryApi = require('../../../api/batteryApi.js');
// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startDate: '开始时间',
    endDate: '结束时间',
    startTime: '',
    endTime: '',
    devNo:'',
    orderNo: '',
    dataArray: [],
    currentPage:1,
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

  getType: function(e) {
    this.setData({
      typeIndex: e.detail.value
    })
  },
  getDevNo:function(e){
    this.setData({
      devNo: e.detail.value
    })
  },
  getOrderNo: function (e) {
    this.setData({
      orderNo: e.detail.value
    })
  },
  startDate: function (e) {
    this.setData({
      startDate: e.detail.value,
      startTime: e.detail.value
    })
  },
  endDate: function (e) {
    this.setData({
      endDate: e.detail.value,
      endTime: e.detail.value
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
      dataArray: [],
      loadComplete: false
    })
    batteryApi.getOrderList({ 'pageNo': currentPage, 'pageSize': 10, 'startTime': that.data.startTime, 'endTime': that.data.endTime, 'devNo': that.data.devNo, 'orderNo': that.data.orderNo}).then((res)=>{
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
        // console.log(devices);
        console.log("totalDataCount:" + totalDataCount);
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
    batteryApi.getOrderList({ 'pageNo': currentPage, 'pageSize': 10 }).then((res)=>{
      wx.hideLoading();
      if(res.data.code){
        var data = res.data; // 接口相应的json数据
        var devices = data.data; // 接口中的data对应了一个数组，这里取名为 devices
        var totalDataCount = devices.length;
        if (totalDataCount == 0) {
          that.setData({
            loadComplete: true
          })
        }
        // console.log(devices);
        console.log("totalDataCount:" + totalDataCount);
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

  search:function(){
    this.loadInitData()
  },
  // 重置时间控件
  Cancel: function(e) {
    
    console.log(e);
    if(e.currentTarget.dataset.name == 'endTime') {
      this.setData({
        endDate: '结束时间'
      })
    } else if(e.currentTarget.dataset.name == 'startTime') {
      this.setData({
        startDate: '开始时间'
      })
    }
  }
})