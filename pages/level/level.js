/*
 * @Author: your name
 * @Date: 2021-05-13 12:41:30
 * @LastEditTime: 2021-05-25 16:02:45
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
                top: "127rpx",
                left: "240rpx"
            },
            {
                top: "332rpx",
                left: "161rpx"
            },
            {
                top: "487rpx",
                left: "128rpx"
            },
            {
                top: "614rpx",
                left: "322rpx"
            },
            {
                top: "783rpx",
                left: "481rpx"
            },
            {
                top: "900rpx",
                left: "337rpx"
            },
            {
                top: "1062rpx",
                left: "387rpx"
            },
            {
                top: "1219rpx",
                left: "481rpx"
            },
            {
                top: "1428rpx",
                left: "450rpx"
            },
            {
                top: "1647rpx",
                left: "300rpx"
            },
        ]
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
                    success (resGrade) {
                      console.log(resGrade.data)
                              wx.request({
                                url: 'https://wx.bitaxes.com/api/episode/all/' + parseInt(resGrade.data.data),
                            
                                success: (reqRes) => {
                                    console.log(reqRes.data)
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


    }
})