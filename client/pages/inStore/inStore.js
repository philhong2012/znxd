// pages/store/store.js
var config = require('../../config');
var util = require('../../utils/util');
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
          util.cacheData('store',store);
        }
      }
    });
  },


  todayInstoreInfo:function() {
    
    var that = this;
    var loginId = that.data.user.floginid;
    wx.request({
      url: config.service.todayInstoreInfo + '/' + loginId,
      data: null,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        if ('001' == res.data.code) {
          //wx.navigateTo({ url: '../location/location' });
          var instoreList = res.data.message;
          that.setData({instoreList:instoreList});
        }
      }
    });
  },

  switchflowChange:function(e) {
    //console.log('switch 发生 change 事件，携带值为', e.detail.value)
    this.setData({ hideFollwerInput: e.detail.value });
  },

  enter: function() {
  var that =this;
  that.setData({
      cid:null,
      dsCode:this.data.dsCode2,
      dsName:this.data.cname,
      floginid:this.data.user.floginid,
      areaCode:this.data.areaCode
    });

    if (typeof this.data.files === 'undefined') {
      util.showModel('警告', '请拍照上传!');
    } else {

      wx.request({
        url: config.service.saveInstoreInfo,
        data: that.data,
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'POST',
        success: function (res) {
          console.log(res.data)
          if ('001' == res.data.code) {
            wx.navigateTo({
              url: '../displayInfo/displayInfo',
            });
          }
        }
      });
    }

  
  },


  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          //files: that.data.files.concat(res.tempFilePaths)
          files: res.tempFilePaths
        });
        //而后上传服务器
        that.uploadToServer();
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },


  uploadToServer: function () {
    var that = this;
    var tempFilePaths = that.data.files;
    wx.uploadFile({
      url: config.service.uploadFile,
      filePath: tempFilePaths[0],
      name: 'uploadFiles',
      formData: {
        'loginId': that.data.user.floginid
      },
      success: function (res) {
        var data = res.data
        var jsonData = JSON.parse(data);
        console.log(res);
        if ('001' === jsonData.code) {
          //console.log(res);
          //console.log(data.message[0]);
          that.setData({ imgName: jsonData.message[0] });
        }
        //do something
      }
    })
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