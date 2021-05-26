// pages/Ans/Ans.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collect:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  changePages:function(){
    wx.navigateTo({
      url: '../translate/translate',
    })
  },
  changeCollect:function(){
    if(this.data.collect){
              this.setData({
                collect:false
              })
    }
    else{
      this.setData({
        collect:true
      })
    }
  }
})