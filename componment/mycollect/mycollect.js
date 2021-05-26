// componment/mycollect/mycollect.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name:String,
    eid:Number
  },
  observers:{ //监听数据的更改
    "name"(data){
      data ===this.data.a //这里不要写this.setData({})
    },
    "eid"(data){
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
    nav: function(){
      console.log(this.data)
    }
  }
})
