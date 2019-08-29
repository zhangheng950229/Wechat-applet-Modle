// pages/list/list.js
let coffeeApi = require('../../../api/coffeeApi.js');



Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityArr: ['', '', ''],
    cityCodeArr: ['', '', ''],
    deviceInfo: {},
    province: '',
    city: '',
    area: '',
    address: '',
    devNo:'',
    cookieValid:'',
    price1: '',
    price1Limit: '',
    price2: '',
    price2Limit: '',
    price3: '',
    price3Limit: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.dialog = that.selectComponent("#citys");
    this.data.deviceInfo.devNo = options.devNo;
    coffeeApi.getDeviceDetail({ 'devNo': options.devNo }).then((res) => {
      var info = info = res.data.info
      var code = res.data.code
      if (code != '0000') {
        wx.showModal({
          title: '提示',
          content: info,
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.navigateBack({//返回
                delta: 1
              })
            } 
          }
        })
      }
      that.setData({
        deviceInfo: res.data.data,
        price1: res.data.data.price1,
        price2: res.data.data.price2,
        price3: res.data.data.price3,
        cookieValid: res.data.data.cookieValid,
        province: res.data.data.province,
        city: res.data.data.city,
        area: res.data.data.area,
        address: res.data.data.address,
        devNo: res.data.data.devNo
      })
      that.dialog.getCityInfo();
    })
    
  },

  saveDevice: function () {
    var that = this;
    coffeeApi.editDevice({
      'devNo': that.data.deviceInfo.devNo,
      'provinceNo': that.data.cityCodeArr[0],
      'cityNo': that.data.cityCodeArr[1],
      'areaNo': that.data.cityCodeArr[2],
      'address': that.data.address,
      'cookieValid': that.data.cookieValid,
      'price1': that.data.price1,
      'price1Limit': that.data.price1Limit,
      'price2': that.data.price2,
      'price2Limit': that.data.price2Limit,
      'price3': that.data.price3,
      'price3Limit': that.data.price3Limit,
    }).then((res) => {
      console.log(res)
      var info = info = res.data.info
      var code = res.data.code
      if (code='0000') {
      
        wx.showToast({
          title: '保存成功',
          icon: 'succes',
          duration: 1500,
          mask: true,
          success: function (res) {
            setTimeout(
              function(){
                wx.navigateBack({//返回
                  delta: 1
                })
              },1500
            )
           
          }
        })

      }else{
      wx.showModal({
        title: '提示',
        content: info,
        showCancel:false,
        success: function (res) {
          if (res.confirm) {
            wx.navigateBack({//返回
              delta: 1
            })
          }
        }
        })
      }
    })
  },

  getType: function (e) {
    console.log("更改省市时改变的:"+e)
    this.setData({
      type: this.data.typeArr[e.detail.value]
    })
  }, 
  getAddress: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  getCookieValid: function (e) {
    var Int;
    if (/^[1-9]\d*$/.test(e.detail.value)) { //正则验证，提现金额小数点后不能大于两位数字
      Int = e.detail.value;
    } else {
      Int = e.detail.value.substring(0, e.detail.value.length - 1);
    }
    this.setData({
      cookieValid: Int
    })
  },
  getPrice1: function (e) {
    var money;
    if (/^(\d?)+(\.\d{0,2})?$/.test(e.detail.value)) { //正则验证，提现金额小数点后不能大于两位数字
      money = e.detail.value;
    } else {
      money = e.detail.value.substring(0, e.detail.value.length - 1);
    }
    this.setData({
      price1: money
    })
  },
  getPrice1Limit: function (e) {
    var Int;
    if (/^[1-9]\d*$/.test(e.detail.value)) { //正则验证，提现金额小数点后不能大于两位数字
      Int = e.detail.value;
    } else {
      Int = e.detail.value.substring(0, e.detail.value.length - 1);
    }
    
    this.setData({
      ['deviceInfo.price1Limit'] : Int,
    })

  },
  getPrice2: function (e) {
    var money;
    if (/^(\d?)+(\.\d{0,2})?$/.test(e.detail.value)) { //正则验证，提现金额小数点后不能大于两位数字
      money = e.detail.value;
    } else {
      money = e.detail.value.substring(0, e.detail.value.length - 1);
    }
    this.setData({
      price2: money
    })
  },
  getPrice2Limit: function (e) {
    var Int;
    if (/^[1-9]\d*$/.test(e.detail.value)) { //整数
      Int = e.detail.value;
    } else {
      Int = e.detail.value.substring(0, e.detail.value.length - 1);
    }
    
    this.setData({
      ['deviceInfo.price2Limit'] : Int,
    })
  },
  getPrice3: function (e) {
    var money;
    if (/^(\d?)+(\.\d{0,2})?$/.test(e.detail.value)) { //正则验证，提现金额小数点后不能大于两位数字
      money = e.detail.value;
    } else {
      money = e.detail.value.substring(0, e.detail.value.length - 1);
    }
    this.setData({
      price3: money
    })
  },
  getPrice3Limit: function (e) {
    var Int;
    if (/^[1-9]\d*$/.test(e.detail.value)) { //正则验证，提现金额小数点后不能大于两位数字
      Int = e.detail.value;
    } else {
      Int = e.detail.value.substring(0, e.detail.value.length - 1);
    }
    
    this.setData({
      ['deviceInfo.price3Limit'] : Int,
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
  search: function () {
  
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