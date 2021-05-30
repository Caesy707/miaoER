/*
 * @Author: your name
 * @Date: 2021-05-18 21:14:30
 * @LastEditTime: 2021-05-22 22:47:13
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
        AisChecked: true,
        BisChecked: true,
        CisChecked: true,
        DisChecked: true,
        episode:{},
        AnsSeleted: [],
        Answer:[],
        spendtime:"0分0秒"
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) { 
      
        var that = this
        console.log(options)
        wx.getStorage({
            key: 'AnsSeleted',
            success (res) {
              console.log(res.data)
              that.setData({
                eid: options.eid,
                AnsSeleted: res.data
              })
            }
        })
        wx.getStorage({
            key: 'Answer',
            success (res) {
              console.log(res.data)
              that.setData({
                Answer: res.data
              })
            }
        })

        wx.getStorage({
            key: 'Episode',
            success (res) {
              console.log(res.data)
              that.setData({
                episode: res.data
              })
            }
        })
    },
    changeColor: function(e) {
        console.log(e.currentTarget.dataset.ans);
        console.log(e.currentTarget.dataset.index)
        var dontSelete = [true,true,true,true];
        if (this.data.AnsSeleted[e.currentTarget.dataset.index][e.currentTarget.dataset.ans]) {
            var temp = this.data.AnsSeleted
            dontSelete[e.currentTarget.dataset.ans] = false
            temp[e.currentTarget.dataset.index] = dontSelete;

            var ans = this.data.Answer
            switch(e.currentTarget.dataset.ans) {
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


        // if (e.currentTarget.dataset.index == 0) {
        //     if (this.data.AisChecked) {
        //         this.setData({
        //             AisChecked: false
        //         })
        //     } else {
        //         this.setData({
        //             AisChecked: true
        //         })
        //     }
        // }
        // if (e.currentTarget.dataset.index == 1) {
        //     if (this.data.BisChecked) {
        //         this.setData({
        //             BisChecked: false
        //         })
        //     } else {
        //         this.setData({
        //             BisChecked: true
        //         })
        //     }
        // }
        // if (e.currentTarget.dataset.index == 2) {
        //     if (this.data.CisChecked) {
        //         this.setData({
        //             CisChecked: false
        //         })
        //     } else {
        //         this.setData({
        //             CisChecked: true
        //         })
        //     }
        // }
        // if (e.currentTarget.dataset.index == 3) {
        //     if (this.data.DisChecked) {
        //         this.setData({
        //             DisChecked: false
        //         })
        //     } else {
        //         this.setData({
        //             DisChecked: true
        //         })
        //     }
        // }

    },
    changePages: function() {
        var that = this;
        wx.navigateTo({
            url: '../read/read',
        })
        wx.setStorage({
            key:"AnsSeleted",
            data:this.data.AnsSeleted
          })
        let pages=getCurrentPages();
  	    let beforePage=pages[pages.length-2];
        wx.navigateBack({
            success: function () {
                wx.setStorage({
                    key:"Answer",
                    data:that.data.Answer
                  })
                beforePage.SyncAnswerByStorage(); // 执行前一个页面的onLoad方法
          }
        });
    },
    submitAns: function () {
        var app = getApp();
        app.globalData.lasttime= this.time()
        var time=getApp().globalData.firsttime
        var usetime= app.globalData.lasttime- time
        //秒
        var second=usetime%60
        //分
        var min=parseInt(usetime/60)
       var sptime=min.toString()+"分"+second.toString()+"秒"
       this.setData({
        spendtime:sptime
    })
    console.log(sptime)
        var that=this
        var ansLen = 4;
        that.data.Answer.forEach(function (value, index, array) {
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
                    "uid": that.data.episode.uid,
                    "eid": that.data.eid,
                    "spend_time": "3分28秒"
                },
                success(res) {
                    console.log(res.data)
                    if (res.data.record) {
                        that.setData({
                            isMask: true
                        })
                    }else{
                        that.setData({
                            failMask: true
                        })
                    }
                }
            })

            console.log(this.data.Answer)
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
                    if (res.data.record) {
                        that.setData({
                            isMask: true
                        })
                    }

                }
            })
        }
        console.log(this.data.Answer)
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
    //获取当前时间
    time:function(){
     //获取当前时间戳
     var timestamp = Date.parse(new Date());  
     timestamp = timestamp / 1000;  
    console.log("当前时间戳为：" + timestamp);  
    return(timestamp)
    }
})