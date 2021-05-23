/*
 * @Author: your name
 * @Date: 2021-05-18 21:14:30
 * @LastEditTime: 2021-05-22 22:47:13
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
        DisChecked: true


    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },
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
    changePages: function() {
        wx.navigateTo({
            url: '../read/read',
        })
    }
})