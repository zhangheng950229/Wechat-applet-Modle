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
    startTime: '开始时间',
    endTime: '结束时间',
    devNo: '',
    machNo:'',
    typeIndex: 0,
    typeArr: [
      {
        id: '',
        name: '全部'
      },
      {
        id: '0',
        name: '未支付'
      },
      {
        id: '1',
        name: '支付完成'
      }
    ]
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
     coffeeApi.getOrder({ 'pageNo': currentPage, 'pageSize': 10, 'devNo': that.data.devNo, 'startTime': that.data.startTime, 'endTime': that.data.endTime, 'status': that.data.typeArr[that.data.typeIndex].id}).then((res) => {
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
  getDevNo: function (e) {
    this.setData({     
      devNo: e.detail.value
    })
  },
  startTime: function (e) {
    console.log(e.detail.value)
    this.setData({
      startTime: e.detail.value
    })
  },
  endTime: function (e) {
    this.setData({
      endTime: e.detail.value
    })
  },
  getType: function (e) {
    this.setData({
      typeIndex: e.detail.value
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
   coffeeApi.getOrder({ 'pageNo': currentPage, 'pageSize': 10, 'devNo': that.data.devNo, 'startTime': that.data.startTime, 'endTime': that.data.endTime, 'status': that.data.typeArr[that.data.typeIndex].id}).then((res) => {
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
  // 重置时间控件
  Cancel: function(e) {
    console.log(e);
    if(e.currentTarget.dataset.name == 'endTime') {
      this.setData({
        endTime: '结束时间'
      })
    } else if(e.currentTarget.dataset.name == 'startTime') {
      this.setData({
        startTime: '开始时间',
      })
    }
  }
})