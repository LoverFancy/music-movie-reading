// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like:{
      type: Boolean,
      // observer:function(){
      // }
    },
    count:{
      type:Number
    },
    readOnly:{
      type:Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc: 'images/like.png',
    noSrc: 'images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike:function(event){
      // 自定义事件
      if(this.properties.readOnly){
        return
      }
      let like = this.properties.like
      let count = this.properties.count

      count = like?count-1:count+1
      this.setData({
        count:count,
        like:!like
      })
      // 触发 自定义事件传递like组件的点赞状态到组件的调用方classic页面
      let behavior = this.properties.like?'like':'cancel'
      // 触发自定义事件(自定义事件名称,{传递自己定义的属性},{冒泡/捕获/组件穿越边界})
      this.triggerEvent('like',{
        behavior:behavior
      },{})
    }
  }
})
