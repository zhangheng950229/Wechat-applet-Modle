// pages/list/list.js
let washerApi = require('../../../api/washerApi.js');



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
        id: '0',
        name: '未支付'
      },
      {
        id: '1',
        name: '已支付'
      }
    ],
    startDate: {
      value: '',
      date: '开始时间'
    },
    endDate: {
      value: '',
      date: '结束时间'
    },
    typeIndex: 0,
    showModle: false,
    currentPage: 1,
    dataArray: [],
    orderNo:'',
    loadComplete: false,
    standard: '',
    fast: '',
    strength: '',
    dehydration: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadInitData();
  },
  // 初始化设备列表方法
  loadInitData: function (page) {
    var that = this;
    var currentPage = this.data.currentPage;
    var tips = "加载第" + (currentPage) + "页";
    wx.showLoading({
      title: tips,
    });
    this.data.dataArray = [];

    washerApi.getOrder({
      'pageNo': currentPage,
      'pageSize': 10,
      'status': that.data.typeArr[that.data.typeIndex].id,
      'orderNo': that.data.orderNo,
      'startTime': that.data.startDate.value,
      'endTime': that.data.endDate.value,
    }).then((res) => {
      wx.hideLoading();
      var Data = res.data.data; // 接口相应的json数据
      var totalDataCount = Data.length;
      if (totalDataCount == 0) {
        that.setData({
          loadComplete: true
        })
      }
      that.setData({
        ["dataArray[" + (currentPage - 1) + "]"]: Data,
        currentPage: currentPage,
        totalDataCount: totalDataCount
      })
    })
  },
  // 列表触底加载
  bindDownLoad: function () {
    if (this.data.loadComplete) return false;
    var currentPage = this.data.currentPage;
    currentPage++;
    this.setData({
      currentPage : currentPage
    });
    this.loadInitData();
  },
  // 获取状态
  getType: function (e) {
    if (e.currentTarget.dataset.name == 'startDate') {
      // console.log(1)
      this.setData({
        startDate: {
          value: e.detail.value,
          date: e.detail.value
        }
      })
    } else if (e.currentTarget.dataset.name == 'endDate') {
      // console.log(12)
      this.setData({
        endDate: {
          value: e.detail.value,
          date: e.detail.value
        }
      })
    } else if (e.currentTarget.dataset.name == 'paytype') {
      console.log(3)
      this.setData({
        typeIndex: e.detail.value
      })
    }
    console.log(this.data)
  },
  // 获取设备编号
  getOrderNo: function (e) {
    this.setData({
      orderNo: e.detail.value
    })
  },


  // 搜索
  search: function () {
    this.setData({
      currentPage : 1,
      dataArray: [],
    });
    this.loadInitData();
  },

  //显示遮罩层
  showModle: function () {
    this.setData({
      showModle: true,
    })

  },
  // 关闭遮罩层
  closeModle: function () {
    this.setData({
      showModle: false,
    });
  },
// 重置时间控件
  Cancel: function(e) {
    console.log(e);
    if(e.currentTarget.dataset.name == 'endDate') {
      this.setData({
        endDate: {
          value: '',
          date: '结束时间'
        }
      })
    } else if(e.currentTarget.dataset.name == 'startDate') {
      this.setData({
        startDate: {
          value: '',
          date: '开始时间'
        },
      })
    }
  }
})