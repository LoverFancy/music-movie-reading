import { Token } from './models/token'
App({
  onLaunch: function () {
    // 有个bug第一次载入小程序是没有token无法获取最新一期，需要重新刷新页面
    new Token().getTokenFromServer()
  }
})