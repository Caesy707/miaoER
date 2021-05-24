/*
 * @Author: your name
 * @Date: 2021-05-18 21:14:30
 * @LastEditTime: 2021-05-22 22:41:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \猫E读\pages\read\read.js
 */
// pages/read/read.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

        AisChecked: true,
        BisChecked: true,
        CisChecked: true,
        DisChecked: true,

        collect: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options)
        var eid = 1;
        var uid = 1;
        wx.request({
          
          url: 'https://wx.bitaxes.com/api/episode/'+ eid +'/'+uid, 
          method: 'GET',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success (res) {
            console.log(res.data)
          }
        })
    
    },
    // 选项选中与未选中的切换
    changeColor: function(e) {
        console.log(e.currentTarget.dataset.index)
        if (e.currentTarget.dataset.index == 0) {
            if (this.data.AisChecked) {
                this.setData({
                    AisChecked: false
                })
            } else {
                this.setData({
                    AisChecked: true
                })
            }
        }
        if (e.currentTarget.dataset.index == 1) {
            if (this.data.BisChecked) {
                this.setData({
                    BisChecked: false
                })
            } else {
                this.setData({
                    BisChecked: true
                })
            }
        }
        if (e.currentTarget.dataset.index == 2) {
            if (this.data.CisChecked) {
                this.setData({
                    CisChecked: false
                })
            } else {
                this.setData({
                    CisChecked: true
                })
            }
        }
        if (e.currentTarget.dataset.index == 3) {
            if (this.data.DisChecked) {
                this.setData({
                    DisChecked: false
                })
            } else {
                this.setData({
                    DisChecked: true
                })
            }
        }

    },
    //读和写的切换
    changePattern: function(e) {
        wx.navigateTo({
            url: '../answer/answer',
        })
    },
    //收藏与未收藏的切换
    changeCollect: function() {
        if (this.data.collect) {
            this.setData({
                collect: false
            })
        } else {
            this.setData({
                collect: true
            })
        }
    },
    getinform: function(e) {
        console.log(e)
    },
    changeposition: function() {
        this.setData({
            ToView: "header"
        })
    }
})