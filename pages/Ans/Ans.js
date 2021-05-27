// pages/Ans/Ans.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collect: false,
    episode: {},
    uid: 0,
    eid: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    wx.getStorage({
      key: 'AnsEpisode',
      success(res) {
        console.log(res.data)
        if (res.data.has_star) {
          that.setData({
            episode: res.data,
            collect: true,
            uid: parseInt(options.uid),
            eid: options.eid
          })
        } else {
          that.setData({
            episode: res.data,
            uid: parseInt(options.uid),
            eid: options.eid
          })
        }
        // that.setData({

        // })
      }
    })

  },
  changePages: function () {
    // wx.navigateTo({
    //   url: '../translate/translate',
    // })
    var that = this
    let pages = getCurrentPages();
    let beforePage = pages[pages.length - 2];
    wx.navigateBack({

      success: function () {
        beforePage.syncEpisode(that.data.episode); // 执行前一个页面的onLoad方法

      }
    });
  },
  changeCollect: function () {
    // if(this.data.collect){
    //           this.setData({
    //             collect:false
    //           })
    // }
    // else{
    //   this.setData({
    //     collect:true
    //   })
    // }

    var that = this
    console.log(that.data)
    if (this.data.collect) {
      wx.request({

        url: 'https://wx.bitaxes.com/api/episode/star',
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        data: {
          "uid": that.data.uid,
          "eid": that.data.eid,
        },
        success(res) {
          var epi = that.data.episode
          epi.has_star = 0
          that.setData({
            collect: false,
            episode: epi
          })
          console.log(res.data)
        }
      })
    } else {

      wx.request({

        url: 'https://wx.bitaxes.com/api/episode/star',
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        data: {
          "uid": that.data.uid,
          "eid": that.data.eid,
        },
        success(res) {
          var epi = that.data.episode
          epi.has_star = 1
          that.setData({
            collect: true,
            episode: epi
          })
          console.log(res.data)
        }
      })
    }
  }
})