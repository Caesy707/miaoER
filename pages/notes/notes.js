// pages/notes/notes.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid: 0,
    aid: 0,
    content: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      uid: options.uid,
      aid: options.aid,
      eid: options.eid
    })
  },
  input: function (e) {
    // console.log(e)
    this.setData({
      content: e.detail.value
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

  },
  submit: function () {
    var that = this;
    console.log(that.data.content)
    if (that.data.content == '') {
      wx.showToast({
        title: '请输入笔记内容',
        icon: 'error',
        duration: 2000
      })
    } else {
      wx.request({

        url: 'https://wx.bitaxes.com/api/episode/note',
        method: 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: {
          "aid": that.data.aid,
          "pid": 0,
          "uid": that.data.uid,
          "content": that.data.content,
        },
        success(res) {
          console.log(res.data)
          wx.redirectTo({
            url: '../translate/translate?eid=' + that.data.eid
          })
        }
      })
    }
  }
})