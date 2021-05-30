// pages/interaction/interaction.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  color:"",
  isPrise:false,
  notice: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options)
    console.log(JSON.parse(options.notice))
    var n = JSON.parse(options.notice)
    // element.updated_at = element.updated_at.substring(5,10);
    that.setData({
      notice: n,
  })
  if(!n.read_at){
    wx.request({
      url: 'https://wx.bitaxes.com/api/wx/user/notice/allread',
      method: 'POST',
      header: {
          'content-type': 'application/json' // 默认值
      },
      data: {
        "uid": options.uid,
      },
      success(res) {
        // res.data.data.forEach(element => {
        //   element.data.content = that.cutTextLong(element.data.content,15)
        // res.data.data.updated_at = res.data.data.updated_at.substring(5,16);
        // });
          // that.setData({
          //     notice: res.data.data,
          // })
          console.log(res.data)
          // console.log(that.data)
      }
  })
  }else{
    console.log(that.data.notice)
  }

  },
  clickStar:function(){
    if(this.data.isPrise){
      this.setData({
        color:"#343b4e",//点赞效果
        isPrise:false
       })
       console.log(1)
    }
    else{
      this.setData({
        color:"#eaa30a",//点赞效果
        isPrise:true
       })
       console.log(1)
    }
   
  }


})