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
        failMask:false,
        AnsSeleted: [
            [true, true, true, true],
            [true, true, true, true],
            [true, true, true, true],
            [true, true, true, true]
        ],
        Answer: ['', '', '', ''],
        isForward:false,
        spendtime:"0分0秒",
        episode: [], // 文章和题目数据
        uid:0,
        star_count:[0,0,0],
        jianHidden:false,
        pointerEvent:"auto"
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var app=getApp()
        app.globalData.firsttime= this.time()//开始页面计时
        console.log(options)
        const that = this;
        // options.eid=1
        var reqUrl = ''
        wx.getStorage({
            key: 'uid',
            success: (res) => {
                console.log(res.data)
                options.uid = res.data
                console.log(options.uid)
                // var eid = 1;
                // var uid = 1;
                if (options.grade) {
                    reqUrl = 'https://wx.bitaxes.com/api/episode/' + options.grade + '/' + options.uid + '/' + options.order
                } else {
                    reqUrl = 'https://wx.bitaxes.com/api/episode/' + options.eid + '/' + options.uid
                }
                wx.request({
                    url: reqUrl,
                    method: 'GET',
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    success(res) {
                        console.log(reqUrl)
                        console.log(res.data)
                        if(res.data.code == "20002"){
                            wx.showToast({
                                title: '关卡更新中',
                                icon: 'success',
                                duration: 2000,
                                success(){
                                    setTimeout(function () {
                                        //要延时执行的代码
                                        wx.redirectTo({
                                            url: '../index/index',
                                          })
                                    }, 2000) //延迟时间
                                   
                                }
                              })

                        }else{
                        var epi = res.data.data
                        var content = '<div style="min-height:200rpx;font-size:36rpx;padding:36rpx;word-break: break-word;line-height:50rpx;">' +epi.content + '</div>';
                        epi.content = content
                        that.setData({
                            episode: epi,
                            eid: res.data.data.eid,
                            uid: options.uid
                        })
                        wx.setStorage({
                            key: "Episode",
                            data: res.data.data
                        })
                        console.log(res.data)
                        console.log(that.data)
                    }
                    }
                })
            },
            fail: () => {
                console.log('not get uid')
            }
        })

    },
    // 滚轮监听事件
upforward:function(e){
if(e.detail.scrollTop>600){
    this.setData({
        isForward:true
    })
}
else{
    this.setData({
        isForward:false
    })
}
},
    // 选项选中与未选中的切换
    changeColor: function (e) {
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
    changePattern: function (e) {
        wx.setStorage({
            key: "AnsSeleted",
            data: this.data.AnsSeleted
        })
        wx.setStorage({
            key: "Answer",
            data: this.data.Answer
        })
        wx.navigateTo({
            url: '../answer/answer?eid='+ this.data.eid,
        })
    },
    SyncAnswerByStorage: function () {
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
    getinform: function (e) {
        console.log(e)
    },
    changeposition: function () {
        this.setData({
            ToView: "header"
        })
    },

    submitAns: function () {
        var that = this;
        var ansLen = 0;
        var app = getApp();
        app.globalData.lasttime= this.time()
        var usetime=  app.globalData.lasttime- app.globalData.firsttime
        //秒
        var second=usetime%60
        //分
        var min=parseInt(usetime/60)
        var sptime=min.toString()+"分"+second.toString()+"秒"
        this.setData({
            spendtime:sptime,
            pointerEvent: "none"
        })
        console.log(sptime)
        that.data.Answer.forEach(function (value, index, array) {
            if(value != ''){
                ansLen+=1
            }
            // if (index < 3) {
            //     if (value == '') {
            //         wx.showToast({
            //             title: '请答完题再提交',
            //             icon: 'error',
            //             duration: 2000
            //         })
            //     }
            // } else {
            //     if (value == '') {
            //         ansLen = 3;
            //     }else{
            //         ansLen = 4;  
            //     }
            // }
        })
        console.log(ansLen)
        if (ansLen < 3) {
            wx.showToast({
                title: '请答完题再提交',
                icon: 'error',
                duration: 2000
            })
        }
        // 答案保存入库请求 
        if (ansLen == 4) {
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
                    "ans4": that.data.Answer[3],
                    // "uid": that.data.episode.uid,
                    "uid": that.data.uid,
                    "eid": that.data.eid,
                    "spend_time": sptime

                },
                success(res) {
                    console.log(res.data)
                    var sc = that.data.star_count
                    sc[res.data.record-1] = 1
                    if (res.data.record) {
                        that.setData({
                            isMask: true,
                            star_count: sc,
                            jianHidden:true
                        })
                    }else{
                        that.setData({
                            failMask: true,
                            star_count: sc,
                            jianHidden:true
                        })
                    }
                }
            })

            console.log(this.data.Answer)
        } else if(ansLen == 3){
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
                    "uid": that.data.uid,
                    "eid": that.data.eid,
                    "spend_time": sptime

                },
                success(res) {
                    console.log(res.data)
                    var sc = that.data.star_count
                    sc[res.data.record-1] = 1
                    if (res.data.record) {
                        that.setData({
                            isMask: true,
                            star_count: sc,
                            jianHidden:true
                        })
                    }else{
                        that.setData({
                            failMask: true,
                            star_count: sc,
                            jianHidden:true
                        })
                    }

                }
            })
        }
        console.log(this.data)
    },

    onunload: function () {
        wx.removeStorageSync('AnsSeleted');
        wx.removeStorageSync('Episode');
        // var pages = getCurrentPages(); //获取页面栈
        // if (pages.length > 1) {
        //     //上一个页面实例对象
        //     var prePage = pages[pages.length - 2];
        //     //调用上一个页面的onShow方法
        //     prePage.onLoad()
        // }
            console.log('监听页面卸载')
         
            wx.navigateTo({
              url: '../level/level'
            })
    },
    //下一关按钮
    changeNext: function () {
        var that = this
        this.setData({
            isMask: false
        })
        var order = that.data.episode.order + 1
        wx.redirectTo({
            url: '../read/read?grade=' + that.data.episode.grade + '&order=' + order,
            success(res) {

            }
        })
    },
    searchAns: function () {
        var that = this;

        wx.navigateTo({
            url: '../translate/translate?eid=' + that.data.episode.eid,
            success(res) {

            }
        })
    },
    //再次挑战按钮
    changeAgain: function () {
        var that = this
        this.setData({
            failMask: false
        })
        var order = that.data.episode.order
        wx.redirectTo({
            url: '../read/read?grade=' + that.data.episode.grade + '&order=' + order,
            success(res) {

            }
        })
    },
    time:function(){
        //获取当前时间戳
        var timestamp = Date.parse(new Date());  
        timestamp = timestamp / 1000;  
       return(timestamp)
       }
})