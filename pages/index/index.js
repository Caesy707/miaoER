/*
 * @Author: your name
 * @Date: 2021-05-05 09:33:10
 * @LastEditTime: 2021-05-24 18:30:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \猫E读\pages\index\index.js
 */
// index.js
// 获取应用实例
const app = getApp()

Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUseGetUserProfile: false,
        hasUserInfoInStorage: true,
        isShow: false,
        isShowtoo: false,
        uid: 0,
        hasGrade: false,
        zIndex:0
        // infoFlag = false
        // hasUserInfo: false      //数据库是否有用户信息
    },
    // 事件处理函数
    bindViewTap() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad() {
        var that = this;
       
        // wx.clearStorage({
        //     complete: (res) => {
        //         console.log("clear")
        //     },
        // })
        // 检查是否过期
        wx.getStorage({
            key: 'uid',
            success: (res) => {
                console.log(res)
                wx.getStorage({
                    key: 'hasGrade',
                    fail: (hasGradeRes)=>{
                        // 获取grade
                wx.request({
                    url: 'https://wx.bitaxes.com/api/wx/user/grade/' + res.data,
                    method: 'GET',
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    success(resGrade) {
                        if(resGrade.data.data == '0'){
                            that.setData({
                                isShow: true,
                                hasGrade: false
                            })
                        }else{
                            that.setData({
                                hasGrade: true
                            })
                            wx.setStorage({
                                key: 'hasGrade',
                                data: 1
                            })
                        }
                    }
                })
                    }
                })
            },
            fail: (res) => {
                console.log(res)
                wx.checkSession({
                    success() {
                        console.log("未过期")
                        wx.login({
                            success(res) {
                                if (res.code) {
                                    //发起网络请求
                                    wx.request({
                                        url: 'https://wx.bitaxes.com/api/wx/user/login/' + res.code,
                                        success(reqRes) {
                                            console.log(reqRes.data)
                                            // wx.setStorage({
                                            //     data: reqRes.data,
                                            //     key: 'code',
                                            // })
                                            if (reqRes.data.data.IsNewUser) {
                                                that.setData({
                                                    isShow: true,
                                                    uid: reqRes.data.data.id,
                                                })
                                            }
                                            that.setData({
                                                uid: reqRes.data.data.id
                                            })
                                            wx.setStorage({
                                                data: reqRes.data.data.id,
                                                key: 'uid',
                                            })
                                            // wx.setStorage({
                                            //     data: reqRes.data.data,
                                            //     key: 'user',
                                            // })

                                        }
                                    })

                                } else {
                                    console.log('登录失败！' + res.errMsg)
                                }
                            }
                        })
                    },
                    fail() {
                        wx.login({
                            success(res) {
                                if (res.code) {
                                    //发起网络请求
                                    wx.request({
                                        url: 'https://wx.bitaxes.com/api/wx/user/login/' + res.code,
                                        success(reqRes) {
                                            console.log(reqRes.data)
                                            // wx.setStorage({
                                            //     data: reqRes.data,
                                            //     key: 'code',
                                            // })
                                            wx.setStorage({
                                                data: reqRes.data.data.id,
                                                key: 'uid',
                                            })
                                            if (reqRes.data.data.IsNewUser) {
                                                that.setData({
                                                    isShow: true,
                                                    zIndex:0
                                                })
                                            }
                                            that.setData({
                                                uid: reqRes.data.data.id
                                            })
                                        }
                                    })

                                } else {
                                    console.log('登录失败！' + res.errMsg)
                                }
                            }
                        })
                    }
                })
            }
        })

        this.getgrade()
    },
    getUserProfile(e) {
        console.log(this.data.canIUseGetUserProfile)
        var that = this
        console.log(that.data.uid)
        // wx.getStorage({
        //     key: 'user',
        //     success: (res) => {
        //         that.navigateTo(e)
        //         console.log(res)
        //     },
        //     fail: (res) => {
        //         console.log(res)
        //         console.log("fail")
        //     }
        // })
        console.log(that.data.canIUseGetUserProfile,  !that.data.hasUserInfoInStorage)
        if (that.data.canIUseGetUserProfile && !that.data.hasUserInfoInStorage) {
            wx.getUserProfile({
                desc: '展示用户信息',
                success: (res) => {
                    console.log(res.userInfo)
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true,
                        isShowtoo: false,
                        zIndex:0
                    })
                    wx.setStorage({
                        data: res.userInfo,
                        key: 'user',
                    })
                    // wx.getStorage({
                    //     key: 'uid',
                    //     success (uidRes) {
                    //       console.log(uidRes.data)

                    //       wx.request({
                    //         url: 'https://wx.bitaxes.com/api/wx/user/userinfo', 
                    //         method: 'POST',
                    //         header: {
                    //         'content-type': 'application/json' // 默认值
                    //         },
                    //         data:{
                    //             "uid": uid.data,
                    //             "ans2": that.data.Answer[1],
                    //             "ans3": that.data.Answer[2],
                    //             "uid": that.data.episode.uid,
                    //             "eid": that.data.eid,
                    //             "spend_time":"3分21秒"

                    //         },
                    //         success(res) {
                    //             console.log(res.data)
                    //         }
                    //     })
                    //     }
                    // })

                    wx.request({
                        url: 'https://wx.bitaxes.com/api/wx/user/userinfo',
                        method: 'POST',
                        header: {
                            'content-type': 'application/json' // 默认值
                        },
                        data: {
                            "uid": that.data.uid,
                            "nickName": res.userInfo.nickName,
                            "avatarUrl": res.userInfo.avatarUrl,
                            "gender": res.userInfo.gender,
                            "country": res.userInfo.country,
                            "province": res.userInfo.province,
                            "city": res.userInfo.city,
                            "language": res.userInfo.language


                        },
                        success(res) {
                            console.log(res.data)
                            that.navigateTo(e)
                        }
                    })
                    // wx.navigateTo({
                    //     url: '../user/user',
                    // })
                    
                },
                fail: () => {
                    // console.log(1)
                    // wx.navigateTo({
                    //     url: '../user/user',
                    // })
                    // wx.showModal({
                    //     title: '提示',
                    //     content: '我们需要你的用户信息',
                    //     success (res) {
                    //       if (res.confirm) {
                    //         console.log('用户点击确定')
                    //       } else if (res.cancel) {
                    //         console.log('用户点击取消')
                    //       }
                    //     }
                    //   })
                }
            })
        }else{
            that.navigateTo(e)
        }
    },
    navigateTo(e) {
        var index = e.currentTarget.dataset.index
        if (index == 1) {
            wx.navigateTo({
                url: '../level/level',
            })
        } else if (index == 2) {
            wx.navigateTo({
                url: '../user/user',
            })
        } else if (index == 3) {
            wx.navigateTo({
                url: '../mailbox/mailbox',
            })
        }
    },
    // 获取关卡列表
    getgrade() {
        // wx.request({
        //     url: 'https://wx.bitaxes.com/api/episode/all/{grade}',
        //     data: {
        //         grade: "3"
        //     },
        //     success: (reqRes) => {
        //         console.log(reqRes.data)
        //     },
        //     fail: () => {
        //         console.log("fail")
        //     }

        // })
    },
    // 首次点击
    firstmask() {
        this.setData({
            isShow: false,
            isShowtoo: true,
            zIndex:3
        })
    },
    //第二次点击
    secondmask() {
        // this.setData({
        //     isShowtoo: false
        // })
    },
    onShow: function(){
        var that = this
        if (wx.getUserProfile) {
            this.setData({
                canIUseGetUserProfile: true
            })
        }
        wx.getStorage({
            key: 'user',
            success: (res) => {
                console.log(res)
                that.setData({
                    hasUserInfoInStorage: true
                })
            },
            fail: (res) => {
                console.log(res)
                that.setData({
                    hasUserInfoInStorage: false
                })
            }
        })
        wx.getStorage({
            key: 'hasGrade',
            success: (res)=>{
                console.log(res)
                that.setData({
                    hasGrade: true,
                    isShowtoo: false
                })
            },
            fail: ()=>{
                console.log("fail")
                that.setData({
                    hasGrade: false,
                })
            }
        })
    },
    onShareAppMessage(){
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
          })
    },
    onShareTimeline(){
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
          })
    }
    
})