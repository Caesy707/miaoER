// pages/interaction/interaction.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: "",
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
    if (!n.read_at) {
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
    } else {
      console.log(that.data.notice)
    }

  },
  deleteByNid: function(e){
    var that = this
    console.log(e)
    wx.request({

      url: 'https://wx.bitaxes.com/api/wx/user/notice/' + e.currentTarget.dataset.nid,
      method: 'DELETE',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        console.log(e)
        var noti = that.data.notice
        noti.splice(e.currentTarget.dataset.index,1)
        console.log(noti)
        that.setData({
          notice: noti
        })
      }
    })
  }


})