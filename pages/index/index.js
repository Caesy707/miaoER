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
        isShow: true,
        isShowtoo: false
    },
    // 事件处理函数
    bindViewTap() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad() {
        if (wx.getUserProfile) {
            this.setData({
                canIUseGetUserProfile: true
            })
        }
        wx.clearStorage({
                complete: (res) => {
                    console.log("clear")
                },
            })
            // 检查是否过期
        wx.checkSession({
            success() {
                console.log("未过期")
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
                                    wx.setStorage({
                                        data: reqRes.data,
                                        key: 'code',
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
        this.getgrade()
    },
    getUserProfile(e) {
        wx.getUserProfile({
            desc: '展示用户信息',
            success: (res) => {

                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true,
                    isShowtoo: false
                })
                wx.setStorage({
                    data: res.userInfo,
                    key: 'user',
                })
                wx.navigateTo({
                    url: '../user/user',
                })
            },
            fail: () => {
                console.log(1)
                wx.navigateTo({
                    url: '../user/user',
                })
            }
        })

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
                url: '../aid/aid',
            })
        }
    },
    // 获取关卡列表
    getgrade() {
        wx.request({
            url: 'https://wx.bitaxes.com/api/episode/all/{grade}',
            data: {
                grade: "3"
            },
            success: (reqRes) => {
                console.log(reqRes.data)
            },
            fail: () => {
                console.log("fail")
            }

        })
    },
    // 首次点击
    firstmask() {
        this.setData({
            isShow: false,
            isShowtoo: true
        })
    },
    //第二次点击
    secondmask() {
        this.setData({
            isShowtoo: false
        })
    }
})