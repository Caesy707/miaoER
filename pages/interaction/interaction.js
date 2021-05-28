// pages/interaction/interaction.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  color:"",
  isPrise:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  clickStar:function(){
    if(this.data.isPrise){
      this.setData({
        color:"#343b4e",//点赞效果
        isPrise:false
       })
       console.log(1)
    }
    else{
      this.setData({
        color:"#eaa30a",//点赞效果
        isPrise:true
       })
       console.log(1)
    }
   
  }


})