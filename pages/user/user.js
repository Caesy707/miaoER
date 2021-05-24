/*
 * @Author: your name
 * @Date: 2021-05-06 17:45:48
 * @LastEditTime: 2021-05-24 18:47:22
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
        level: [{
                id: 0,
                name: "四级"
            },
            {
                id: 1,
                name: "六级"
            },
            {
                id: 2,
                name: "专四"
            },
            {
                id: 3,
                name: "专八"
            },
        ],
        index: 4,
        fillshow: true, //填写是否显示
        reviseshow: false
    },
    onLoad() {
        this.getinform()
        if (wx.getStorage) {
            this.setData({
                AvatarUrl: "userAvatarUrl",
                nickName: "usernickName"
            })
        }
    },
    // 获取个人信息
    getinform: function() {
        wx.getStorage({
            key: 'user',
            success: (res) => {
                console.log(res.data)
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
        console.log(1)
        this.setData({
            isModal: true
        })
    },
    hiddenModal: function() {
        this.setData({
            isModal: false
        })
    },
    changeCheck: function(e) {

    },
    change: function(e) {
        console.log(e.currentTarget.dataset.index)
        var sindex = e.currentTarget.dataset.index
        this.setData({
            index: sindex,
            fillshow: false,
            reviseshow: true
        })
    }
})