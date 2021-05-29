// pages/Ans/Ans.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    AnsIcon: [
      ['https://z3.ax1x.com/2021/05/18/ghfZ40.png',
        'https://z3.ax1x.com/2021/05/18/ghfVNq.png',
        'https://z3.ax1x.com/2021/05/18/ghfkHs.png',
        'https://z3.ax1x.com/2021/05/18/ghfugU.png'],
      ['https://z3.ax1x.com/2021/05/29/2A3JM9.png',
        'https://z3.ax1x.com/2021/05/29/2A3YrR.png',
        'https://z3.ax1x.com/2021/05/29/2A38xJ.png',
        'https://z3.ax1x.com/2021/05/29/2A3324.png'],
      ['https://z3.ax1x.com/2021/05/29/2A3BGD.png',
        'https://z3.ax1x.com/2021/05/29/2A3dIK.png',
       'https://z3.ax1x.com/2021/05/29/2A3aa6.png',
        'https://z3.ax1x.com/2021/05/29/2A30PO.png']
    ],
    Ans: [],
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
        //下面是对数据库取出的用户答案进行处理
        var userEpisode = res.data.user_episode[0]
        // console.log(userEpisode.que1.substring(1,2))
        // console.log(userEpisode.que1.charCodeAt(0)-65)
        // console.log(res.data.questions[0].answer.charCodeAt(0)-65)
        var ans = new Array()

        // 问题1答案
        ans[0] = [0,0,0,0];
        if(userEpisode.que1.substring(1,2) == 'T'){
          var curren = userEpisode.que1.charCodeAt(0)-65  // 正确答案
          for(var i = 0; i < 4; i++ ){
            if(i == curren){
              ans[0][i] = 1   
              break
            }
          }
        }else {
          var currenAns = res.data.questions[0].answer.charCodeAt(0)-65   // 正确答案
          var falseAns = userEpisode.que1.charCodeAt(0)-65    // 错误答案
          for(var i = 0; i < 4; i++ ){
            if(i == currenAns){
              ans[0][i] = 1   
            }else if(i == falseAns){
              ans[0][i] = 2
            }
          }
        }

         // 问题2答案
         ans[1] = [0,0,0,0];
         if(userEpisode.que2.substring(1,2) == 'T'){
           var curren = userEpisode.que2.charCodeAt(0)-65  // 正确答案
           for(var i = 0; i < 4; i++ ){
             if(i == curren){
               ans[1][i] = 1  
               break 
             }
           }
         }else {
           var currenAns = res.data.questions[1].answer.charCodeAt(0)-65   // 正确答案
           var falseAns = userEpisode.que2.charCodeAt(0)-65    // 错误答案
           for(var i = 0; i < 4; i++ ){
             if(i == currenAns){
               ans[1][i] = 1   
             }else if(i == falseAns){
               ans[1][i] = 2
             }
           }
         }
         // 问题3答案
         ans[2] = [0,0,0,0];
         if(userEpisode.que3.substring(1,2) == 'T'){
           var curren = userEpisode.que3.charCodeAt(0)-65  // 正确答案
           for(var i = 0; i < 4; i++ ){
             if(i == curren){
               ans[2][i] = 1   
               break
             }
           }
         }else {
           var currenAns = res.data.questions[2].answer.charCodeAt(0)-65   // 正确答案
           var falseAns = userEpisode.que3.charCodeAt(0)-65    // 错误答案
           for(var i = 0; i < 4; i++ ){
             if(i == currenAns){
               ans[2][i] = 1   
             }else if(i == falseAns){
               ans[2][i] = 2
             }
           }
         }
       
        if(userEpisode.que4 != ''){
          // 问题4答案
         ans[3] = [0,0,0,0];
         if(userEpisode.que4.substring(1,2) == 'T'){
           var curren = userEpisode.que4.charCodeAt(0)-65  // 正确答案
           for(var i = 0; i < 4; i++ ){
             if(i == curren){
               ans[3][i] = 1  
               break 
             }
           }
         }else {
           var currenAns = res.data.questions[3].answer.charCodeAt(0)-65   // 正确答案
           var falseAns = userEpisode.que4.charCodeAt(0)-65    // 错误答案
           for(var i = 0; i < 4; i++ ){
             if(i == currenAns){
               ans[3][i] = 1   
             }else if(i == falseAns){
               ans[3][i] = 2
             }
           }
         }
        }
        console.log(ans)
        that.setData({
          Ans: ans
        })
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