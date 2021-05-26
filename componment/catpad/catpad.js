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

  }
})
