// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    star: [],
    uid:0,
    show:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(parseInt(options.uid))
    this.setData({
      uid: parseInt(options.uid)
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
  onShow: function (e) {
    var that = this
    
    wx.request({
      
      url: 'https://wx.bitaxes.com/api/star/'+ that.data.uid, 
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        // that.setData({
        //   star:res.data
        // })
        if(res.data.code == 20002){
          that.setData({
            show:false
          })
        }else{
          that.setData({
            star:res.data
          })
        }
        console.log(that.data.star)
      }
    })
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

  }
})