// pages/list/list.js
const app = getApp();
const coffeeApi = require('../../../api/coffeeApi.js');



Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModle: false,
    currentPage: 1,
    dataArray: [],
    devNo: '',
    machNo:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // wx.getSystemInfo({
    //   success: function (res) {
    //     console.log("调用成功")
    //     console.log(res)
    //     that.setData({
    //       scrollHeight: res.windowHeight - 120
    //     });
    //   }
    // });
    this.loadInitData()
  },
  getDevNo: function (e) {
    this.setData({     
      devNo: e.detail.value
    })
  },
  getMachNo: function (e) {
    this.setData({
      machNo: e.detail.value
    })
  },
  getSelectCity: function (e) {
    console.log(e.detail);//控制台打印:"来自component的信息"
    this.setData({
      cityArr: e.detail.city,
      cityCodeArr: e.detail.code,
      province: e.detail.city[0],
      city: e.detail.city[1],
      area: e.detail.city[2]
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
   coffeeApi.getDeviceList({ 'pageNo': currentPage, 'pageSize': 10, 'devNo': that.data.devNo, 'machNo': that.data.machNo }).then((res) => {
     var info = info = res.data.info
     var code = res.data.code
     if (code != '0000') {
       wx.showModal({
         title: '提示',
         content: info,
         showCancel: false,
         success: function (res) {
           if (res.confirm) {
           }
         }
       })
     }
      wx.hideLoading();
      var data = res.data; // 接口相应的json数据
      var devices = data.data; // 接口中的data对应了一个数组，这里取名为 devices
      var totalDataCount = devices.length;
      console.log(devices);
      console.log("totalDataCount:" + totalDataCount);
      that.setData({
        ["dataArray[" + (currentPage - 1) + "]"]: devices,
        currentPage: currentPage,
        totalDataCount: totalDataCount
      })
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
    coffeeApi.getDeviceList({ 'pageNo': currentPage, 'pageSize': 10, 'devNo': that.data.devNo, 'machNo': that.data.machNo }).then((res) => {
      wx.hideLoading();
      if (res.data.code == '0000') {
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
      } else {
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
  search: function () {
    this.loadInitData()
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