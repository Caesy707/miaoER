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
        styleCss: [
            {
                top: 176,
                left: 230,
                transform: 0
            },
            {
                top: 334,
                left: 156
            },
            {
                top: 510,
                left: 144,
                transform:9
            },
            {
                top: 602,
                left: 310,
                transform: -49
            },
            {
                top: 742,
                left: 480,
                transform: -43
            },
            {
                top: 880,
                left: 344
            },
            {
                top: 1092,
                left: 386,
                transform: -29
            },
            {
                top: 1282,
                left: 524,
                transform: -35
            },
            {
                top: 1480,
                left: 384
            },
            {
                top: 1647,
                left: 300
            }
        ],
        episode: [],
        listLength: 30,
        mapHeight: 0,
        newlist: [{
                top: 176,
                left: 230,
                transform: 0
            },
            {
                top: 334,
                left: 156
            },
            {
                top: 510,
                left: 106
            },
            {
                top: 602,
                left: 310,
                transform: -49
            },
            {
                top: 742,
                left: 480,
                transform: -43
            },
            {
                top: 880,
                left: 344
            },
            {
                top: 1092,
                left: 386,
                transform: -29
            },
            {
                top: 1282,
                left: 524,
                transform: -35
            },
            {
                top: 1480,
                left: 384
            },
            {
                top: 1647,
                left: 300
            }
        ],
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function (options) {
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
                        if(resGrade.data.data == "0"){
                            wx.showToast({
                                title: '请填写等级',
                                icon: 'error',
                                duration: 2000
                              })
                        }else{
                        wx.request({
                            url: 'https://wx.bitaxes.com/api/episode/all/' + resGrade.data.data + '/' + res.data,

                            success: (reqRes) => {
                                console.log(reqRes)
                                that.setData({
                                    episode: reqRes.data.data,
                                    listLength: reqRes.data.data.length
                                })
                                that.showEpisode(reqRes.data.data.length)
                            },
                            fail: () => {
                                console.log("fail")
                            }
                        })
                    }
                    }
                })
            },
            fail: () => {
                console.log('not get uid')
            }
        })
    },
    // onShow: function(params) {
    //     console.log(this.data.episode.length)
    //     this.showEpisode(this.data.episode.length)
    // },
    showEpisode: function (length) {
        var that = this
        var levelInfoList = that.data.styleCss;
        var lastLevelTop = levelInfoList[levelInfoList.length - 1].top
        let newInfoList = JSON.parse(JSON.stringify(that.data.newlist));
        for (var i = 1; i < length/10; i++) {
            lastLevelTop = that.data.styleCss[that.data.styleCss.length - 1].top // 更新this.data.styleCss
            levelInfoList = that.data.styleCss
            newInfoList = JSON.parse(JSON.stringify(that.data.newlist));
            console.log(lastLevelTop)
            console.log(levelInfoList)
            for (var j = 0; j < 10; j++) {
                newInfoList[j].top = levelInfoList[j].top + lastLevelTop + 190
            }
            console.log(newInfoList)
            that.data.styleCss = levelInfoList.concat(newInfoList)
            console.log(that.data.styleCss)
        }
        that.setData({
            styleCss: that.data.styleCss, //数组追加
            mapHeight: that.data.styleCss[that.data.styleCss.length - 1].top,
        })
    }
})