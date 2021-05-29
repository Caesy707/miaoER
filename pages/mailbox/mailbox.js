// pages/mailbox/mailbox.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notices: {},
    uid:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'uid',
      success: (res) => {
          console.log(res.data)
          wx.request({
              url: 'https://wx.bitaxes.com/api/wx/user/notice/' + res.data,
              method: 'GET',
              header: {
                  'content-type': 'application/json' // 默认值
              },
              success(res) {
                res.data.data.forEach(element => {
                  element.data.content = that.cutTextLong(element.data.content,15)
                });
                  that.setData({
                      notices: res.data.data,
                      uid: parseInt(res.data),
                  })
                  console.log(res.data)
                  console.log(that.data)
              }
          })
      },
      fail: () => {
          console.log('not get uid')
      }
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
  cutTextLong: function(text, num) {//text为传入文本，num为需要留下的文本长度
    if(text.length>num) {
    return text.slice(0,num?num:11)+'···'
  }else {
    return text
  }
  },
})