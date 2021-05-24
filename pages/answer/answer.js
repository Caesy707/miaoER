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

        AisChecked: true,
        BisChecked: true,
        CisChecked: true,
        DisChecked: true,
        episode:{},
        AnsSeleted: [],
        Answer:[],


    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this
        wx.getStorage({
            key: 'AnsSeleted',
            success (res) {
              console.log(res.data)
              that.setData({
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
        // wx.navigateTo({
        //     url: '../read/read',
        // })
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
    }
})