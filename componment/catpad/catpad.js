// componment/catpad/catpad.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        index: Number,
        info: Object,
        previou_record: Number
    },
    observers: { //监听数据的更改
        "index"(data) {
            data === this.data.a //这里不要写this.setData({})
        },
        "info"(data) {
            data === this.data.a //这里不要写this.setData({})
        },
        "previou_record"(data) {
            data === this.data.a //这里不要写this.setData({})
        }
    },
    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        navTo(e) {
            var that = this
            console.log(that.data.previou_record)
            if (that.data.index <= 2) {
                console.log(e.currentTarget.dataset)
                console.log(e)
                var navUrl = ''
                if (e.currentTarget.dataset.hasrecord == '0') {
                    navUrl = '../read/read?eid='
                } else {
                    navUrl = '../translate/translate?eid='
                }
                wx.navigateTo({
                    url: navUrl + e.currentTarget.dataset.infoid,
                    events: {},
                    success: function (res) {
                        console.log(e.currentTarget.dataset.hasrecord)
                    }
                })
            } else {
                if (that.data.previou_record <= 0) {
                    wx.showToast({
                        title: '请按顺序闯关',
                        icon: 'error',
                        duration: 2000
                      })
                } else {
                        var navUrl = ''
                        if (e.currentTarget.dataset.hasrecord == '0') {
                            navUrl = '../read/read?eid='
                        } else {
                            navUrl = '../translate/translate?eid='
                        }
                        wx.navigateTo({
                            url: navUrl + e.currentTarget.dataset.infoid,
                            events: {},
                            success: function (res) {
                                console.log(e.currentTarget.dataset.hasrecord)
                            }
                        })
                }
            }
        }
    }
})