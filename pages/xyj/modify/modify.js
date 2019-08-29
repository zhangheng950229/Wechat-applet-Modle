// pages/list/list.js
let washerApi = require('../../../api/washerApi.js');



Page({

  /**
   * 页面的初始数据
   */
  data: {
    devNo: '',
    IMEINO: '',
    name: '',
    province: '',
    city: '',
    area: '',
    address: '',
    standard: '',
    fast: '',
    strength: '',
    dehydration: '',
    cityArr: ['', '', ''],
    cityCodeArr: ['', '', '']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.dialog = that.selectComponent("#citys");
    this.data.devNo = options.devNo;
    if (this.data.devNo) {
      washerApi.getDeviceDetail({
        "devNo": that.data.devNo
      }).then((res) => {
        var Data = res.data;
        if (Data.code == "0000") {
          this.setData({
            "devNo": options.devNo,
            'IMEINO': Data.data.imei,
            'name': Data.data.name,
            "province": Data.data.province,
            "city": Data.data.city,
            "area": Data.data.area,
            'address': Data.data.address,
            'standard': Data.data.standard,
            'fast': Data.data.fast,
            'strength': Data.data.strength,
            'dehydration': Data.data.dehydration
          });
          that.dialog.getCityInfo();
        }
      })
    }
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
  // 获取一键重置价格各个值
  getValue: function (e) {
    var money;
    if (/^(\d?)+(\.\d{0,2})?$/.test(e.detail.value)) { //正则验证，提现金额小数点后不能大于两位数字
      money = e.detail.value;
    } else {
      money = e.detail.value.substring(0, e.detail.value.length - 1);
    }
    if (e.currentTarget.dataset.name == 'standard') {
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
  },

  getAddress: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  saveDevice: function () {
    var that = this;
    console.log(that.data)
    washerApi.editDevice({
      'devNo': that.data.devNo,
      'provinceNo': that.data.cityCodeArr[0],
      'cityNo': that.data.cityCodeArr[1],
      'areaNo': that.data.cityCodeArr[2],
      'address': that.data.address,
      'standard': that.data.standard,
      'fast': that.data.fast,
      'strength': that.data.strength,
      'dehydration': that.data.dehydration
    }).then((res) => {
      if (res.data.code == '0000') {
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 1500,
          mask: true,
          success: function () {
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 1500)
          }
        })
      } else {
        wx.showToast({
          title: res.data.info,
          icon: 'none',
        })
      }
    })
  },

})