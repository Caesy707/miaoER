// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid: 0,
    content: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      uid: options.uid
    })
  },
  input: function (e) {
    // console.log(e)
    this.setData({
      content: e.detail.value
    })
  },
  submit: function () {
    var that = this;
    console.log(that.data.content)
    wx.request({
      url: 'https://wx.bitaxes.com/api/feedback', 
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        "uid": that.data.uid,
        "content": that.data.content,
      },
      success(res) {
        console.log(res.data)
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        })
        that.setData({
          content: ''
        })
      }
    })

  },
  onShareAppMessage(){
      wx.showShareMenu({
          withShareTicket: true,
          menus: ['shareAppMessage', 'shareTimeline']
        })
  },
  onShareTimeline(){
      wx.showShareMenu({
          withShareTicket: true,
          menus: ['shareAppMessage', 'shareTimeline']
        })
  }
})