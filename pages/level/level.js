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
                transform:-49
            },
            {
                top: 742,
                left: 480,
                transform:-43
            },
            {
                top: 880,
                left: 344
            },
            {
                top: 1092,
                left: 386,
                transform:-29
            },
            {
                top: 1282,
                left: 524,
                transform:-35
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
        listLength:30,
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
            transform:-49
        },
        {
            top: 742,
            left: 480,
            transform:-43
        },
        {
            top: 880,
            left: 344
        },
        {
            top: 1092,
            left: 386,
            transform:-29
        },
        {
            top: 1282,
            left: 524,
            transform:-35
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
                                that.setData({
                                    episode: reqRes.data.data,
                                    listLength:reqRes.data.data.length
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
    //    var  newlist= [{
    //     top: 176,
    //     left: 230,
    //     transform: 0
    // },
    // {
    //     top: 334,
    //     left: 156
    // },
    // {
    //     top: 510,
    //     left: 106
    // },
    // {
    //     top: 602,
    //     left: 310,
    //     transform:-49
    // },
    // {
    //     top: 742,
    //     left: 480,
    //     transform:-43
    // },
    // {
    //     top: 880,
    //     left: 344
    // },
    // {
    //     top: 1092,
    //     left: 386,
    //     transform:-29
    // },
    // {
    //     top: 1282,
    //     left: 524,
    //     transform:-35
    // },
    // {
    //     top: 1480,
    //     left: 384
    // },
    // {
    //     top: 1647,
    //     left: 300
    // }],
       var listLength=this.data.listLength/10
       console.log(listLength)
       const levelInfoList = this.data.styleCss;
       const newInfoList=this.data.newlist;
       var lastLevelTop = levelInfoList[levelInfoList.length - 1].top
        for(var i=0;i<listLength-1;i++){
            for(var j=0;j<10;j++){
                newInfoList[j].top=levelInfoList[j].top+lastLevelTop+190
            } 
            this.setData({
                styleCss:levelInfoList.concat(newInfoList),//数组追加
                mapHeight: lastLevelTop*listLength
           })
           console.log(lastLevelTop)
        }
     
    }
})
//首先获取后端所要循环关卡的循环数，再从循环数中得知循环几次
//在每个旧数组的top，加上上一个数组最后一个的top，然后把新数组赋值给旧数组
//最后把最初的数组赋值