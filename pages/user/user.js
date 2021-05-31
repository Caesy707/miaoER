/*
 * @Author: your name
 * @Date: 2021-05-06 17:45:48
 * @LastEditTime: 2021-05-26 19:20:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \猫E读\pages\user\user.js
 */
// pages/user/user.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        user: {},
        nickName: " ",
        unregistered: true,
        registered: false,
        isModal: false,
        hasGrade: 0,
        // level: [{
        //         id: 0,
        //         name: "四级"
        //     },
        //     {
        //         id: 1,
        //         name: "六级"
        //     },
        //     {
        //         id: 2,
        //         name: "专四"
        //     },
        //     {
        //         id: 3,
        //         name: "专八"
        //     },
        // ],
        level: [],
        index: 4,
        uid: 0,
        fillshow: false, //填写是否显示
        reviseshow:true, //修改是否显示
        isMask: false, //引导
        isMask2: false ,
    },
    onLoad() {
        var that = this
        this.getinform()
        // if (wx.getStorage) {
        //     this.setData({
        //         AvatarUrl: "userAvatarUrl",
        //         nickName: "usernickName"

        //     })
        // }
        wx.request({
            url: 'https://wx.bitaxes.com/api/episode/grades',
            method: 'GET',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                console.log(res.data.data)
                that.setData({
                    level: res.data.data
                })
            }
        })


        // 获取英语等级
        wx.getStorage({
            key: 'uid',
            success: (res) => {
                console.log(res.data)
                that.setData({
                    uid: res.data
                })
                wx.request({
                    url: 'https://wx.bitaxes.com/api/wx/user/grade/' + res.data,
                    method: 'GET',
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    success(resGrade) {
                        console.log(resGrade.data.data)
                        if (resGrade.data.data != '0') {
                            that.setData({
                                index: parseInt(resGrade.data.data) - 3,
                                hasGrade:1
                            })
                        } else {
                            that.setData({
                                fillshow: true, //填写是否显示
                                reviseshow: false, //修改是否显示
                                isMask: true, //引导
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
    // 获取个人信息
    getinform: function() {
        wx.getStorage({
            key: 'user',
            success: (res) => {
                console.log(res)
                this.setData({
                    user: res.data,
                    AvatarUrl: res.data.avatarUrl,
                    nickName: res.data.nickName,
                    unregistered: false,
                    registered: true
                })

            },
            fail: () => {
                console.log(1)
            }

        })
    },
    showModal: function() {
        console.log(2)
        this.setData({
            isModal: true,
            isMask: false
        })
    },
    hiddenModal: function() {
        console.log(this.data)
        var that = this
        this.setData({
            isModal: false
        })
        if(that.data.hasGrade){
            that.setData({
                isMask2: true
            })
        }
    },
    changeCheck: function(e) {

    },
    change: function(e) {
        console.log(e.currentTarget.dataset.index)
        var sindex = e.currentTarget.dataset.index
        var that = this;
        this.setData({
            index: sindex - 3,
            fillshow: false,
            reviseshow: true
        })

        wx.getStorage({
            key: 'uid',
            success: (res) => {
                console.log(res.data)
                wx.request({
                    url: 'https://wx.bitaxes.com/api/wx/user/grade',
                    method: 'POST',
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    data: {
                        "uid": res.data,
                        "grade": sindex
                    },
                    success(res) {
                        console.log(res.data)
                        if(!that.data.hasGrade){
                            that.setData({
                                hasGrade: 1
                            })
                        }
                        wx.setStorage({
                            key: 'hasGrade',
                            data: 1
                        })
                    }
                })
            },
            fail: () => {
                console.log('not get uid')
            }

        })
    },
    navigatorMail:function(){
        wx.navigateTo({
          url: '../mailbox/mailbox',
        })
    },
    clickMask2:function(params) {
        this.setData({
            isMask2: false
        })
    }
})