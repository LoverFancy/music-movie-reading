// components/book/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book:Object,
    showLike:{
      type:Boolean,
      value:true
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
    onTap(event){
      const bid = this.properties.book.id
      // 组件内部去跳转非常方便但是也降低了组件的通用性。如果做通用组件就不要些业务逻辑到组件中
      // 应该使用triggerEvent去传递数据
      wx.navigateTo({
        url:`/pages/book-detail/book-detail?bid=${bid}`
      })
    }
  }
})
