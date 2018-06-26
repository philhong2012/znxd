// pages/store/store.js
var config = require('../../config');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    location: {
      latitude: "",
      longitude: "",
      pointx:'',
      pointy:'',
      name: "",
      address: ""
    },
    storeList:[
      
    ],
    user: {}
  },

  getStoreList:function() {
    var that = this;
    console.log(that);
    wx.request({
      url: config.service.nearbyStores,
      data: that.data.location,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        if ('001' == res.data.code) {
          that.setData({storeList:res.data.message});
        }
      }
    })
    // var list = [];
    // for(var i=0;i<20;i++) {
    //   var store = {};
    //   store.order = i+1;
    //   store.isSubject = i % 2 == 0 ? '是':'否';
    //   store.name = 'name' + i;
    //   list.push(store);
    // }

    // return list;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        that.setData({ location: { pointx: res.longitude, pointy: res.latitude, name: res.name, address: res.address } });
        that.getStoreList();
        
      },
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