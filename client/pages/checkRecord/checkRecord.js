// pages/checkRecord/checkRecord.js
var config = require('../../config');
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    imgName:'',
    dispSurfItems:[1,2,3,4],
    dispSurfIndex:null,
    dispPosiItems:['优','良','中','差'],
    dispPosiIndex:null,
    drugBcode:null,
    drugCode:null,
    drugName:null,
    drugNumb:null,
    drugPrice:null,
    storeNum:null
  },

  scan:function() {
    var that = this;
    wx.scanCode({
      success: (res) => {
        console.log(res);
        that.setData({drugBcode:res.result});
      }
    })
  },

  takePhoto:function() {
    wx.chooseImage({
      count: 2, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths);
      }
    })
  },

  formSubmit:function(e) {
    this.setData(e.detail.value);
    var that = this;
    //获取数据，调用后台，成功后，进入功能首页
    //wx.navigateTo({ url:'../location/location'});
    wx.request({
      url: config.service.saveDisplayInfo,
      data: that.data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: function (res) {
        if ('001' == res.data.code) {
          util.showSuccess('保存成功');
        } else {
          util.showModel('出错啦',null);
        }
      }
    });
  },



  onDispSurfChanged :function(e) {
    this.setData({
      dispSurfIndex: e.detail.value
    })
  },



  onDispPosiChanged:function(e) {
    this.setData({
      dispPosiIndex: e.detail.value
    })
  },

  uploadToServer:function() {
    var tempFilePaths = this.data.files;
    wx.uploadFile({
      url: config.service.uploadFile,
      filePath: tempFilePaths[0],
      name: 'uploadFiles',
      formData: {
        'user': 'test'
      },
      success: function (res) {
        var data = res.data
        if('001' === data.code) {
          that.setData({ imgName:data.message});
        }
        //do something
      }
    })
  },
  

  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          //files: that.data.files.concat(res.tempFilePaths)
          files:res.tempFilePaths
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