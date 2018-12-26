// pages/login/index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    monitorType : ["计划巡店","定位巡店"],
    monitorTypeIndex:1,
    account:"",
    password:"",
    followMan:"",
    floginid:"",
    fpassword:""
  },

  formSubmit: function (e) {
    console.log('you should delete some letters then fill in full login name to login in when in weixin develop tools,otherwise,the form submit event will not trigger');
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    this.setData(e.detail.value);
    this.login();
  },
  formReset: function () {
    //console.log('form发生了reset事件')
  },


  onMonitorTypeChanged:function(e) {
    this.setData({
      monitorTypeIndex: e.detail.value
    })
  },

  login: function() {
    var that = this;
    //获取数据，调用后台，成功后，进入功能首页
    //wx.navigateTo({ url:'../location/location'});
    wx.request({
      url: config.service.loginUrl2, 
      data:that.data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method:'POST',
      success: function (res) {
        console.log(res);
        wx.setStorage({
          key: 'user',
          data: res.data.message,
        });

        //清除位置缓存
        wx.removeStorage({key:'location'});
        if('001' == res.data.code) {
          
          wx.navigateTo({ url: '../location/location' });
        } else {
          util.showModel('警告','用户名获密码错误');
        }
      },fail:function() {
        console.log("登陆失败");
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("get user cache to load user account and psw!");
    var that = this;
    util.getCache('user', function (res) {
      that.setData({ floginid: res.data.floginid, fpassword: res.data.fpassword });
    });
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