// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    monitorType : ["计划巡店","定位巡店"],
    monitorTypeIndex:1,
    account:"",
    password:"",
    followMan:""
  },


  onMonitorTypeChanged:function(e) {
    console.log('巡店模式改变', e.detail.value)
    this.setData({
      monitorTypeIndex: e.detail.value
    })
  },

  login: function() {
    //获取数据，调用后台，成功后，进入功能首页
    wx.navigateTo({ url:'../location/location'});
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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