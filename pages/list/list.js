// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startDate: '开始时间',
    endDate : '结束时间',
    type : '状态',
    typeArr : ['空闲','工作中','离线','故障']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let type = options.type;
    console.log(type)
  },

  startDate: function (e) {
    this.setData({
      startDate: e.detail.value
    })
  }, 
  endDate: function (e) {
    this.setData({
      endDate: e.detail.value
    })
  },
  getType: function(e) {
    console.log(e)
    this.setData({
      type: this.data.typeArr[e.detail.value]
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