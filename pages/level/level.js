/*
 * @Author: your name
 * @Date: 2021-05-13 12:41:30
 * @LastEditTime: 2021-05-26 21:49:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \猫E读\pages\level\level.js
 */
// pages/level/level.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        styleCss: [{
                top: 217,
                left: 260,
                transform: 0
            },
            {
                top: 398,
                left: 161
            },
            {
                top: 566,
                left: 128
            },
            {
                top: 779,
                left: 322
            },
            {
                top: 969,
                left: 481
            },
            {
                top: 1159,
                left: 337
            },
            {
                top: 1349,
                left: 387
            },
            {
                top: 1219,
                left: 481
            },
            {
                top: 1428,
                left: 450
            },
            {
                top: 1647,
                left: 300
            }
        ],
        episode: [],
        mapHeight: 0
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        //获取英语等级
        wx.getStorage({
            key: 'uid',
            success: (res) => {
                console.log(res.data)
                wx.request({
                    url: 'https://wx.bitaxes.com/api/wx/user/grade/' + res.data,
                    method: 'GET',
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    success(resGrade) {
                        console.log(resGrade)
                        wx.request({
                            url: 'https://wx.bitaxes.com/api/episode/all/' + resGrade.data.data + '/' + res.data,

                            success: (reqRes) => {
                                console.log(reqRes.data)
                                that.setData({
                                    episode: reqRes.data.data
                                })
                            },
                            fail: () => {
                                console.log("fail")
                            }
                        })
                    }
                })
            },
            fail: () => {
                console.log('not get uid')
            }

        })

        const levelInfoList = this.data.styleCss;
        var lastLevelTop = levelInfoList[levelInfoList.length - 1].top
        console.log(lastLevelTop)
        this.setData({
            mapHeight: lastLevelTop
        })
    }
})