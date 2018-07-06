// pages/addStore/storeForm.js
var config = require('../../config');
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cname:"",
    levelItems:['A','B','C'],
    destFlagItems:['是','否'],
    monthAmt:0,
    // provinceItems: [{ provinceCode: '', provinceName: '广东省' }, { provinceCode: 'B', provinceName: '' }, { provinceCode: 'C', provinceName: '' }],
    // cityItems: [{ cityCode: '', cityName: '广州市' }, { cityCode: '', cityName: '' }, { cityCode: '', cityName: '' }],
    provinceItems:['广东省'],
    cityItems:['广州市'],
    address:null,
    pointx:'',
    pointy:'',
    sales:'',
    levelIndex:''
  
  },

  goToStoreList:function() {
    wx.navigateTo({ url: '../location/location' });
  },

  onDestFlagChanged: function (e) {
    this.setData({
      destFlagIndex: e.detail.value
    })
  },

  onlevelChanged: function (e) {
    //console.log(e);
    this.setData({
      
      levelIndex: e.detail.value,levl:e.detail.value
    })
  },

  onProvinceChanged: function (e) {
    this.setData({
      provinceIndex: e.detail.value
    })
  },

  onCityChanged: function (e) {
    this.setData({
      cityIndex: e.detail.value
    })
  },

  formSubmit: function (e) {
    this.setData(e.detail.value);
    var that = this;
    //获取数据，调用后台，成功后，进入功能首页
    //wx.navigateTo({ url:'../location/location'});
    wx.request({
      url: config.service.saveStoreInfo,
      data: that.data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: function (res) {
        if ('001' == res.data.code) {
          util.showSuccess('保存成功');
        } else {
          util.showModel('出错啦', null);
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'user',
      success: function (res) {
        that.setData({ sales: res.data.fname + '(' + res.data.floginid + ')'});
      }
    });
    wx.getStorage({
      key: 'location',
      success: function (res) {
        console.log(res);
        that.setData({ pointx:res.data.longitude,pointy:res.data.latitude,address:res.data.address });
      }
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