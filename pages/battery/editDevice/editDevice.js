// pages/list/list.js
let batteryApi = require('../../../api/batteryApi.js');



Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '状态',
    typeArr: ['空闲', '工作中', '离线', '故障'],
    cityArr:['','',''],
    cityCodeArr:['','',''],
    showModle: false,
    currentPage: 1,
    devNo:'',
    province:'',
    city:'',
    area:'',
    address:'',
    unitPrice:'',
    deposit:'',
    freeTime:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;

      this.dialog = this.selectComponent("#citys");
      batteryApi.getDeviceDetail({'devNo':options.devNo}).then((res)=>{
        if(res.data.code=='0000'){
          var data = res.data.data;
          that.setData({
            devNo: data.devNo,
            province: data.province,
            city: data.city,
            area: data.area,
            address: data.address,
            unitPrice: data.unitPrice,
            deposit: data.deposit,
            freeTime: data.freeTime
          })
          that.dialog.getCityInfo();
        }else{
          wx.showToast({
            title: res.data.info,
            icon: 'none',
          })
        }
      })

  },

  getAddress: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  getUnitPrice:function(e){
    var money;
    if (/^(\d?)+(\.\d{0,2})?$/.test(e.detail.value)) { //正则验证，提现金额小数点后不能大于两位数字
      money = e.detail.value;
    } else {
      money = e.detail.value.substring(0, e.detail.value.length - 1);
    }
    this.setData({
      unitPrice:money
    })
  },
  getDeposit:function(e){
    var money;
    if (/^(\d?)+(\.\d{0,2})?$/.test(e.detail.value)) { //正则验证，提现金额小数点后不能大于两位数字
      money = e.detail.value;
    } else {
      money = e.detail.value.substring(0, e.detail.value.length - 1);
    }
    this.setData({
      deposit:money
    })
  },
  getFreeTime:function(e){
    var dubfloat;
    if (/^(\d?)+(\.\d{0,2})?$/.test(e.detail.value)) { //正则验证，提现金额小数点后不能大于两位数字
      dubfloat = e.detail.value;
    } else {
      dubfloat = e.detail.value.substring(0, e.detail.value.length - 1);
    }
    this.setData({
      freeTime:dubfloat
    })
  },
  saveDevice:function(){
    var that = this;
    batteryApi.editDevice({
      'devNo':that.data.devNo,
      'provinceNo': that.data.cityCodeArr[0],
      'cityNo': that.data.cityCodeArr[1],
      'areaNo': that.data.cityCodeArr[2],
      'address':that.data.address,
      'deposit':that.data.deposit,
      'unitPrice':that.data.unitPrice,
      'freeTime':that.data.freeTime
    }).then((res)=>{
      if(res.data.code=='0000'){
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration:1500,
          mask:true,
          success:function(){
            setTimeout(function(){
              wx.navigateBack({
                delta: 1
              })
            },1500)
          }
        })
      }else{
        wx.showToast({
          title: res.data.info,
          icon: 'none',
        })
      }
    })
  },

  getSelectCity: function (e) {
    console.log(e.detail);//控制台打印:"来自component的信息"
    this.setData({
      cityArr: e.detail.city,
      cityCodeArr: e.detail.code,
      province:e.detail.city[0],
      city:e.detail.city[1],
      area:e.detail.city[2]
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