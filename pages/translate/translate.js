/*
 * @Author: your name
 * @Date: 2021-05-26 16:07:26
 * @LastEditTime: 2021-05-26 20:42:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \miaoER\pages\translate\translate.js
 */
// pages/translate/translate.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        collect: false,
        ToView: "",
        episode: {},
        uid:0,
        eid:0,
        aid:0,
        isForward:false,
        // isColor:"",
        // isPrise:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options)
        var that = this
        wx.getStorage({
            key: 'uid',
            success: (res) => {
                console.log(res.data)
                options.uid = res.data

                console.log(options.uid)
                    // var eid = 1;
                    // var uid = 1;
                wx.request({
                    url: 'https://wx.bitaxes.com/api/episode/' + options.eid + '/' + options.uid,
                    method: 'GET',
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    success(res) {
                        if(res.data.data.has_star){
                            that.setData({
                                collect: true
                            })
                        }
                        var epi = res.data.data
                        var translate = '<div style="min-height:200rpx;font-size:36rpx;padding:36rpx;word-break: break-word;line-height:50rpx;">' +epi.translate + '</div>';
                        var content = '<div style="min-height:200rpx;font-size:36rpx;padding:36rpx;word-break: break-word;line-height:50rpx;">' +epi.content + '</div>';
                        epi.translate = translate
                        epi.content = content
                        
                        that.setData({
                            episode: epi,
                            uid: parseInt(options.uid),
                            eid: options.eid,
                            aid: res.data.data.id
                        })
                        // wx.setStorage({
                        //     key: "Episode",
                        //     data: res.data.data
                        // })
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
upforward:function(e){
if(e.detail.scrollTop>600){
    this.setData({
        isForward:true
    })
}
else{
    this.setData({
        isForward:false
    })
}
},
    syncEpisode: function(e) {
        console.log(e)
        
        if (e.has_star) {
            this.setData({
                episode: e,
                collect: true
            })
        }else{
            this.setData({
                episode: e,
                collect: false
            })
        }
    },

    changeCollect: function() {
        var that = this
        // if (this.data.collect) {
        //     this.setData({
        //         collect: false
        //     })
        // } else {
        //     this.setData({
        //         collect: true
        //     })
        // }
        console.log(that.data)
        if(this.data.collect){
            wx.request({

                url: 'https://wx.bitaxes.com/api/episode/star', 
                method: 'POST',
                header: {
                  'content-type': 'application/json' 
                },
                data:{
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
        }else{

            wx.request({

                url: 'https://wx.bitaxes.com/api/episode/star', 
                method: 'POST',
                header: {
                  'content-type': 'application/json' 
                },
                data:{
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
    },
    changeposition: function() {
        this.setData({
            ToView: "header"
        })
    },
    clickStar:function(e){
        var that = this 
        console.log(e) 
        wx.request({ 
 
            url: 'https://wx.bitaxes.com/api/episode/note/like',  
            method: 'POST', 
            header: { 
              'content-type': 'application/json'  
            }, 
            data:{ 
              "uid": that.data.uid, 
              "cid": e.currentTarget.dataset.cid, 
            }, 
            success(res) { 
                var epi = that.data.episode 
                epi.notes[e.currentTarget.dataset.index].like_count = res.data.data.like_count; 
                epi.notes[e.currentTarget.dataset.index].has_like = res.data.data.has_like; 
                that.setData({ 
                    episode:epi 
                }) 
              console.log(res.data) 
            } 
          }) 
        //   if(this.data.isPrise){
        //     this.setData({
        //       isColor:"#343b4e",//点赞效果
        //       isPrise:false
        //      })
        //   }
        //   else{
        //     this.setData({
        //       isColor:"#eaa30a",//点赞效果
        //       isPrise:true
        //      })
        //   }
    },
    changePattern:function(e){
        console.log(e)
        wx.setStorage({
            key: "AnsEpisode",
            data: this.data.episode
        })
        // wx.setStorage({
        //     key: "Answer",
        //     data: this.data.Answer
        // })
        wx.navigateTo({
            url: '../Ans/Ans?eid=' + this.data.eid + '&uid=' + this.data.uid,
        })
    },
    onunload: function() {
        wx.removeStorageSync('AnsEpisode');
    },
    writeNote: function(e){
        wx.navigateTo({
          url:'../notes/notes?aid=' + this.data.aid + '&uid=' + this.data.uid + '&eid=' + this.data.eid,
        })
    },
    againChallenged: function(params) {
        wx.redirectTo({
          url: '../read/read?eid=' + this.data.eid,
        })
        
    },
    cutTextLong: function (text, num) { //text为传入文本，num为需要留下的文本长度
        if (text.length > num) {
          return text.slice(0, num ? num : 11) + '···'
        } else {
          return text
        }
      },
})