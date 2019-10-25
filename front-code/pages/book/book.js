import {
  BookModel
} from '../../models/book.js'

import {
  random
} from '../../util/common.js'

const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching:false,
    more:''
  },

  /**
   * 生命周期函数--监听页面加
   */
  // optins接收传入页面的参数
  onLoad: function () {
    bookModel.getHotList()
      .then(res => {
        // console.log(res)
        this.setData({
          books:res
        })
      })
    // id
  },

  onSearching(event){
    this.setData({
      searching:true
    })
  },

  onCancel(event){
    this.setData({
      searching:false
    }) 
  },

  onReachBottom(){
    this.setData({
      more:random(16)
    })
  }

  

})