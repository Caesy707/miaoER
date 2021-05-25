/*
 * @Author: your name
 * @Date: 2021-05-18 21:14:30
 * @LastEditTime: 2021-05-25 23:37:52
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
        eid: 0,
        isMask: false,
        AnsSeleted: [
            [true, true, true, true],
            [true, true, true, true],
            [true, true, true, true],
            [true, true, true, true]
        ],
        Answer: ['', '', '', ''],
        collect: true,
        episode: [] // 文章和题目数据
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const that = this;
        // options.eid=1
        wx.getStorage({
            key: 'uid',
            success: (res) => {
                console.log(res.data)
                options.uid = res.data

                console.log(options.uid)
                    // var eid = 1;
                    // var uid = 1;
                wx.request({
                    url: 'https://wx.bitaxes.com/api/episode/' + options.eid + '/' + options.uid,
                    method: 'GET',
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    success(res) {

                        that.setData({
                            episode: res.data.data,
                            eid: options.eid
                        })
                        wx.setStorage({
                            key: "Episode",
                            data: res.data.data
                        })
                        console.log(res.data)
                        console.log(that.data)
                    }
                })
            },
            fail: () => {
                console.log('not get uid')
            }
        })


    },
    // 选项选中与未选中的切换
    changeColor: function(e) {
        console.log(e.currentTarget.dataset.ans);
        console.log(e.currentTarget.dataset.index)
        var dontSelete = [true, true, true, true];
        if (this.data.AnsSeleted[e.currentTarget.dataset.index][e.currentTarget.dataset.ans]) {
            var temp = this.data.AnsSeleted
            dontSelete[e.currentTarget.dataset.ans] = false
            temp[e.currentTarget.dataset.index] = dontSelete;

            var ans = this.data.Answer
            switch (e.currentTarget.dataset.ans) {
                case '0':
                    ans[e.currentTarget.dataset.index] = 'A'
                    break;
                case '1':
                    ans[e.currentTarget.dataset.index] = 'B'
                    break;
                case '2':
                    ans[e.currentTarget.dataset.index] = 'C'
                    break;
                case '3':
                    ans[e.currentTarget.dataset.index] = 'D'
                    break;
                default:

            }

            this.setData({
                AnsSeleted: temp,
                Answer: ans
            })
        } else {
            var temp = this.data.AnsSeleted
                //dontSelete[e.currentTarget.dataset.que] = true
            temp[e.currentTarget.dataset.index] = dontSelete;
            this.setData({
                AnsSeleted: temp
            })
        }
    },
    //读和写的切换
    changePattern: function(e) {
        wx.setStorage({
            key: "AnsSeleted",
            data: this.data.AnsSeleted
        })
        wx.setStorage({
            key: "Answer",
            data: this.data.Answer
        })
        wx.navigateTo({
            url: '../answer/answer',
        })
    },
    SyncAnswerByStorage: function() {
        var that = this
        wx.getStorage({
            key: 'AnsSeleted',
            success(res) {
                console.log(res.data)
                that.setData({
                    AnsSeleted: res.data
                })
            }
        })

        wx.getStorage({
            key: 'Answer',
            success(res) {
                console.log(res.data)
                that.setData({
                    Answer: res.data
                })
            }
        })
    },

    //收藏与未收藏的切换
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
    getinform: function(e) {
        console.log(e)
    },
    changeposition: function() {
        this.setData({
            ToView: "header"
        })
    },

    submitAns: function() {
        var that = this;
        var ansLen = 4;
        this.setData({
            isMask: true
        })
        that.data.Answer.forEach(function(value, index, array) {
                if (index < 3) {
                    if (value == '') {
                        wx.showToast({
                            title: '请答完题再提交',
                            icon: 'error',
                            duration: 2000
                        })
                    }
                } else {
                    if (value == '') {
                        ansLen = 3;
                    }
                }
            })
            // 答案保存入库请求 
        if (ansLen == 4) {

        } else {
            wx.request({
                url: 'https://wx.bitaxes.com/api/episode/question',
                method: 'POST',
                header: {
                    'content-type': 'application/json' // 默认值
                },
                data: {
                    "ans1": that.data.Answer[0],
                    "ans2": that.data.Answer[1],
                    "ans3": that.data.Answer[2],
                    "uid": that.data.episode.uid,
                    "eid": that.data.eid,
                    "spend_time": "3分21秒"

                },
                success(res) {
                    console.log(res.data)
                }
            })
        }
        console.log(this.data.Answer)
    },

    onunload: function() {
        wx.removeStorageSync('AnsSeleted');
        wx.removeStorageSync('Episode')
    },
    //下一关按钮
    changeNext: function() {
        this.setData({
            isMask: false
        })
    },
    searchAns: function() {
        this.setData({
            isMask: true
        })
    }
})