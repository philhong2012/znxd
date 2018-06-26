// pages/store/store.js
var config = require('../../config');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hideFollwerInput:false,
    cid:"",
    dsCode:"",
    cname:"",
    user:{}
  },

  getStoreInfo: function () {
    var that = this;
    //获取数据，调用后台，成功后，进入功能首页
    //wx.navigateTo({ url:'../location/location'});
    wx.request({
      url: config.service.getStoreInfo+'/'+that.data.cid,
      data: null,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        if ('001' == res.data.code) {
          //wx.navigateTo({ url: '../location/location' });
          var store = res.data.message;
          that.setData(store);
          console.log(that.data); 
        }
      }
    });
  },

  switchflowChange:function(e) {
    //console.log('switch 发生 change 事件，携带值为', e.detail.value)
    this.setData({ hideFollwerInput: e.detail.value });
  },

  enter: function() {
    var data = {
      dsCode:this.data.dsCode2,
      dsName:this.data.cname,
      floginid:this.data.user.floginid,
      areaCode:this.data.areaCode
    }
    wx.request({
      url: config.service.saveInstoreInfo,
      data: data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        if ('001' == res.data.code) {
          wx.navigateTo({
            url: '../checkRecord/checkRecord',
          });
        }
      }
    });

  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options);
    this.setData({cid:options.id});
    var that = this;
    wx.getStorage({
      key: 'user',
      success: function (res) {
        that.setData({user:res.data});
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getStoreInfo();

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