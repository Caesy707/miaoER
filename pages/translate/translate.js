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
        eid:0
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
                        that.setData({
                            episode: res.data.data,
                            uid: parseInt(options.uid),
                            eid: options.eid
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
                    that.setData({
                        collect: false
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
                    that.setData({
                        collect: true
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
        console.log(e)
    }
})