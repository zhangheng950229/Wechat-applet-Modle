// pages/list/list.js
let washerApi = require('../../../api/washerApi.js');



Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '状态',
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
    showModle: false,
    currentPage: 1,
    dataArray: [],
    devNo: '',
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
  loadInitData: function () {
    var that = this;
    var currentPage = 1;
    var tips = "加载第" + (currentPage) + "页";
    wx.showLoading({
      title: tips,
    });
    this.data.dataArray = [];
    washerApi.getDeviceList({
      'pageNo': currentPage,
      'pageSize': 10,
      'status': that.data.typeArr[that.data.typeIndex].id,
      'devNo': that.data.devNo
    }).then((res) => {
      wx.hideLoading();
      var Data = res.data.data; // 接口相应的json数据
      var totalDataCount = Data.length;
      that.setData({
        ["dataArray[" + (currentPage - 1) + "]"]: Data,
        currentPage: currentPage,
        totalDataCount: totalDataCount
      })
    })
  },
  // 列表触底加载
  bindDownLoad: function () {
    var that = this;
    if (this.data.loadComplete) return false;
    var currentPage = this.data.currentPage;
    currentPage++;
    var tips = "加载第" + (currentPage) + "页";
    wx.showLoading({
      title: tips,
    });
    washerApi.getDeviceList({ 'pageNo': currentPage, 'pageSize': 10 }).then((res) => {
      wx.hideLoading();
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
    })
  },
  // 获取状态
  getType: function (e) {
    console.log(e.detail.value);
    this.setData({
      typeIndex: e.detail.value
    })
  },
  // 获取设备编号
  getDevNo: function (e) {
    if (e.detail.value) {
      this.setData({
        devNo: e.detail.value
      })
    } else {
      this.loadInitData();
    }

  },
  // 获取一键重置价格各个值
  getValue: function (e) {
    var money;
    if (/^(\d?)+(\.\d{0,2})?$/.test(e.detail.value)) { //正则验证，提现金额小数点后不能大于两位数字
      money = e.detail.value;
    } else {
      money = e.detail.value.substring(0, e.detail.value.length - 1);
    }
    if (e.currentTarget.dataset.name == 'standard') {
      // console.log(1)
      this.setData({
        standard: money
      })
    } else if (e.currentTarget.dataset.name == 'fast') {
      // console.log(12)
      this.setData({
        fast: money
      })
    } else if (e.currentTarget.dataset.name == 'strength') {
      console.log(3)
      this.setData({
        strength: money
      })
    } else if (e.currentTarget.dataset.name == 'dehydration') {
      this.setData({
        dehydration: money
      })
    }
    console.log(this.data)
  },
  // 重置按钮
  restPrize: function () {
    console.log(11);
    var that = this;
    if (!(this.data.standard || this.data.fast || this.data.strength || this.data.dehydration)) {
      wx.showToast({
        title:'请至少填写一项',
        icon: 'none',
        duration: 3000,
        success: function() {
          return false;
        }
      })
    } else {
      washerApi.editAllDevice({
        standard: that.data.standard,
        fast: that.data.fast,
        strength: that.data.strength,
        dehydration: that.data.dehydration
      }).then((res) => {
        var Data = res.data;
        if (Data.code == "0000") {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000,
            success: function () {
              that.closeModle();
              that.setData({
                standard: '',
                fast: '',
                strength: '',
                dehydration: ''
              });
            }
          })
        }
      })
    }
  },
  // 搜索
  search: function () {
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
      standard: '',
      fast: '',
      strength: '',
      dehydration: ''
    });
  },


})