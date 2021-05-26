// componment/catpad/catpad.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index:Number,
    info: Object
  },
  observers:{ //监听数据的更改
    "index"(data){
      data ===this.data.a //这里不要写this.setData({})
    },
    "info"(data){
      data ===this.data.a //这里不要写this.setData({})
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
    navTo(e){
      console.log(e.currentTarget.dataset)
      console.log(e)
      var navUrl = ''
      if(e.currentTarget.dataset.hasrecord == '0'){
        navUrl = '../read/read?eid='
      }else{
        navUrl = '../translate/translate?eid='
      }
      wx.navigateTo({
        url: navUrl + e.currentTarget.dataset.infoid,
        events: {
        },
        success: function(res) {
          console.log(e.currentTarget.dataset.hasrecord)
        }
      })
    }
  }
})
