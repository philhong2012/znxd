// pages/store/store.js
var config = require('../../config');
var qqMapWx = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    location: {
      latitude: "",
      longitude: "",
      pointx: '',
      pointy: '',
      name: "",
      address: ""
    },
    storeList: [

    ],
    user: {}
  },

  goToStoreForm: function() {
    wx.navigateTo({
      url: '../addStore/storeForm'
    });
  },

  refreshStore: function() {
    this.getStoreList();
  },

  getStoreList: function() {
    var that = this;
    wx.request({
      url: config.service.nearbyStores,
      data: that.data.location,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: function(res) {
        console.log(res.data)
        if ('001' == res.data.code) {
          that.setData({
            storeList: res.data.message
          });
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 实例化API核心类
    qqmapsdk = new qqMapWx({
      key: config.qqMapKey
    });
  },

  setLocation: function(data) {
    this.setData({
      location: {
        pointx: data.longitude,
        pointy: data.latitude,
        address: data.address
      }
    });

  },

  cacheLocation: function(res) {
    //存入缓存
    wx.setStorage({
      key: 'location',
      data: res
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  onReady: function() {
    var that = this;
    wx.getStorage({
      key: 'location',
      success: function(res) {
        //如果有缓存，直接从缓存读取位置信息
        //console.log(res);
        console.log('success:get location from cache')
        that.setLocation(res.data);
        that.getStoreList();
      },
      fail: function() {
        console.log('failed:get location from cache')
        wx.getLocation({
          success: function(res) {
            //that.setLocation(res);
            console.log("get location using qqmapsdk...")
            qqmapsdk.reverseGeocoder({
              location: {
                latitude: res.latitude,
                longitude: res.longitude
              },
              success: function(addressRes) {
                console.log(addressRes);
                //var nation = ress.result.address_component.nation;
                var provinceName = addressRes.result.address_component.province;
                var cityName = addressRes.result.address_component.city;
                //var district = ress.result.address_component.district;
                var address = addressRes.result.address;
                var areaCode = addressRes.result.ad_info.adcode;
                var cityCode = addressRes.result.ad_info.city_code;
                that.setData({
                  cityName: cityName,
                  provinceName: provinceName,
                  location: {
                    pointx: res.longitude,
                    pointy: res.latitude,
                    address: address,
                    areaCode:areaCode,
                    cityCode:cityCode
                  }
                })
                res.address = address;
                res.areaCode = areaCode;
                res.cityCode = cityCode;
                res.cityName = cityName;
                res.provinceName = provinceName;
                that.getStoreList();
                that.cacheLocation(res);
              },
            });
          },
          fail:function(errMsg) {
            console.log(errMsg);
          }
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})