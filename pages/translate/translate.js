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
        ToView: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

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
    changeposition: function() {
        this.setData({
            ToView: "header"
        })
    }
})