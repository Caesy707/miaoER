// pages/mailbox/mailbox.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notices: {},
    uid: 0,
    startX: 0, //开始坐标
    startY: 0,
    items: [{
      data:{
        'title':'互动消息',
        'content':''
      },
      'updated_at': '',
      'un_read_count': 0,
      'isTouchMove': false
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // for (var i = 0; i < 10; i++) {
    //   this.data.items.push({
    //    content: i + " 向左滑动删除哦,向左滑动删除哦,向左滑动删除哦,向左滑动删除哦,向左滑动删除哦",
    //    isTouchMove: false //默认全隐藏删除
    //   })
    //  }
    //  console.log(this.data.items)
    //  this.setData({
    //   items: this.data.items
    //  })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    wx.getStorage({
      key: 'uid',
      success: (resU) => {
        console.log(resU.data)
        wx.request({
          url: 'https://wx.bitaxes.com/api/wx/user/notice/' + resU.data,
          method: 'GET',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            var re_c = 0
            res.data.data.forEach(element => {
              element.data.content = that.cutTextLong(element.data.content, 15)
              element.updated_at = element.updated_at.substring(5, 10);
              element.isTouchMove = false
              if(!element.read_at){
                re_c+=1
              }
            });
            console.log(re_c)
            var reItem = that.data.items
            reItem[0].data = {
              'title':'互动消息',
              'content': res.data.data[0].data.content
            }
            reItem[0].updated_at = res.data.data[0].updated_at
            // reItem[0].un_read_count = re_c
            reItem[0].un_read_count = re_c

            that.setData({
              notices: res.data.data,
              uid: resU.data,
              items: reItem
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
  cutTextLong: function (text, num) { //text为传入文本，num为需要留下的文本长度
    if (text.length > num) {
      return text.slice(0, num ? num : 11) + '···'
    } else {
      return text
    }
  },
  navTo: function (e) {
    console.log(e.currentTarget.dataset)
    var that = this
    console.log(that.data.notices[e.currentTarget.dataset.index])

    wx.navigateTo({
      url: '../interaction/interaction?notice=' + JSON.stringify(that.data.notices) + '&uid=' + that.data.uid,
    })
  },
  //   delete:function(){
  // console.log(1)
  //   },




  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.items.forEach(function (v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      items: this.data.items
    })
  },
  //滑动事件处理
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index, //当前索引
      startX = that.data.startX, //开始X坐标
      startY = that.data.startY, //开始Y坐标
      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
      //获取滑动角度
      angle = that.angle({
        X: startX,
        Y: startY
      }, {
        X: touchMoveX,
        Y: touchMoveY
      });
    that.data.items.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      items: that.data.items
    })
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  //删除事件
  del: function (e) {
    var that = this
    console.log(e)
    wx.request({

      url: 'https://wx.bitaxes.com/api/wx/user/notice/all/' + that.data.uid,
      method: 'DELETE',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.data.items.splice(e.currentTarget.dataset.index, 1)
        that.setData({
          items: that.data.items
        })
      }
    })


  },
  deleteAll: function (e) {
    var that = this
    wx.getStorage({
      key: 'uid',
      success: (res) => {
        console.log(res.data)
        wx.request({

          url: 'https://wx.bitaxes.com/api/wx/user/notice/allread',
          method: 'POST',
          data:{
            uid: res.data
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res.data)
            that.onShow()
          }
        })
      },
      fail: () => {
        console.log('not get uid')
      }

    })
  }
})