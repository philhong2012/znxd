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

  goToStoreForm:function() {
    wx.navigateTo({ url: '../addStore/storeForm' });
  },
  getStoreList:function() {
    var that = this;
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
   
  },

  setLocation:function(data) {
    this.setData({ location: { pointx: data.longitude, pointy: data.latitude, address: data.address } });
  },

  cacheLocation:function(res) {
    //存入缓存
    wx.setStorage({
      key: 'location',
      data: res
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  onReady: function () {
    console.log('xxxxxx')

    var that = this;

    wx.getStorage({
      key: 'location',
      success: function (res) {
          //如果有缓存，直接从缓存读取位置信息
          //console.log(res);
          that.setLocation(res.data);
          that.getStoreList();
      },
      fail:function() {
        wx.chooseLocation({
          success: function (res) {
            that.setLocation(res);
            that.getStoreList();
            that.cacheLocation(res);
         
          },
        });
      }
      
    });


    
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