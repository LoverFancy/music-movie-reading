import {
  ClassicModel
} from '../../models/classic.js'
import {
  LikeModel
} from '../../models/like.js'
import { Token } from '../../models/token.js'
const classicModel = new ClassicModel()
const likeModel = new LikeModel()

Component({

  /**
   * 页面的初始数据
   */

  properties: {
    cid: Number,
    type: Number
  },

  data: {
    classic: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  attached(options) {
    const cid = this.properties.cid
    const type = this.properties.type
    if (!cid) {
      // getlatest是个异步的方法，不能通过同步的方法接收请求的结果
      // let latest = classicModel.getLatest() // 同步方法是不行的
      // 此处通过回调函数的方式接收异步返回的结果，更好的方式是使用promise和async/await方法
      classicModel.getLatest((res) => {
        // 验证token是否合法，不合法则更新token
        const verifyToken = new Token().verifyToken()
        this.setData({
          classic: res,
          likeCount: res.fav_nums,
          likeStatus: res.like_status
        })
      })
      // promise方式
      // classicModel.getLatest().then(res => {
      //   this.setData({
      //     classic: res,
      //     likeCount: res.fav_nums,
      //     likeStatus: res.like_status
      //   })
      //   // 存储latest的index
      //   classicModel._setLatestIndex(res.index)
      //   let key = classicModel._getKey(res.index)
      //   // 存储当前的期刊信息
      //   wx.setStorageSync(key, res)
      // })      
    }
    else{
      // 由cid和type获取
      classicModel.getById(cid, type,res=>{
        this._getLikeStatus(res.id, res.type)
        // console.log(res)
        this.setData({
          classic: res,
          latest: classicModel.isLatest(res.index),
          first: classicModel.isFirst(res.index)
        }) 
      })
      // classicModel.getById(cid, type).then(res=>{
      //   this._getLikeStatus(res.id, res.type)
      //   // console.log(res)
      //   this.setData({
      //     classic: res,
      //     latest: classicModel.isLatest(res.index),
      //     first: classicModel.isFirst(res.index)
      //   }) 
      // })
    }
  },

  methods: {
    onLike: function (event) {
      // 获取组件触发的自定义事件的参数
      const behavior = event.detail.behavior
      // 调用model的like方法发起请求(参数为传递的状态,id,类型)
      likeModel.like(behavior, this.data.classic.id,this.data.classic.type)
    },

    onNext: function (event) {
      this._updateClassic('next')
    },

    onPrevious: function (event) {
      this._updateClassic('previous')
    },

    _updateClassic: function (nextOrPrevious) {
      const index = this.data.classic.index
      classicModel.getClassic(index, nextOrPrevious, (res) => {
        // 获取点赞的状态，这个是随时变化的，不应获取缓存的数据，应该获取服务器的最新数据
        this._getLikeStatus(res.id, res.type)
        this.setData({
          classic: res,
          latest: classicModel.isLatest(res.index),
          first: classicModel.isFirst(res.index)
        })
      })
      // const _that = this
      // classicModel.getClassic(index, nextOrPrevious).then(res=>{
      //   this._getLikeStatus(res.id, res.type)
      //   this.setData({
      //     classic: res,
      //     latest: classicModel.isLatest(res.index),
      //     first: classicModel.isFirst(res.index)
      //   })
      //   wx.setStorageSync(classicModel._getKey(res.index), res)
      // })
    },

    _getLikeStatus: function (artID, category) {
      likeModel.getClassicLikeStatus(artID, category,
        (res) => {
          // console.log(res)
          this.setData({
            likeCount: res.fav_nums,
            likeStatus: res.like_status
          })
        })
      // likeModel.getClassicLikeStatus(artID, category).then(res=>{
      //   this.setData({
      //     likeCount: res.fav_nums,
      //     likeStatus: res.like_status
      //   })
      // })
    },
  }
})