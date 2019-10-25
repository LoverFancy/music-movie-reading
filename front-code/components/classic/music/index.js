import {
  classicBeh
} from '../classic-beh.js'

const mMgr = wx.getBackgroundAudioManager()

Component({
  behaviors: [classicBeh],
  properties: {
    src: String,
    title:String
  },

  /**
   * 组件的初始数据
   * 播放音乐API 老版API 新版API
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png',
  },

  // hidden ready created
  //onShow
  attached(event) {
    // 图标和音乐状态判断
    this._recoverStatus()
    // 监听后台播放器的状态，并与播放图标状态进行对应
    this._monitorSwitch()
  },

  detached: function (event) {
    // wx:if hidden
    // 保持音乐播放
    // mMgr.stop()
  },

  /**
   * 组件的方法列表 
   */
  methods: {
    onPlay: function (event) {
      // 图片要切换
      if (!this.data.playing) {
        this.setData({
          playing: true
        })
        // 播放
        mMgr.src = this.properties.src
        mMgr.title = this.properties.title
      } else {
        this.setData({
          playing: false
        })
        // 暂停
        mMgr.pause()
      }
    },

    _recoverStatus: function () {
      // 无音乐在播放
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return
      }
      // 播放当前的音乐与当前的期刊src相等，则将图片状态改为暂停
      if (mMgr.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },

    _monitorSwitch: function () {
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
})