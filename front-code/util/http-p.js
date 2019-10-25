import { Base64 } from 'js-base64'
import {config} from '../config.js'
import {Token} from '../models/token'
// const tips = {
//     1: '抱歉，出现了一个错误',
//     1005:'appkey无效，请前往www.7yue.pro申请',
//     3000:'期刊不存在'
// }
// # 解构
class HTTP{
  // 封装成promise：1.promise解决异步回调的问题，解决回调地狱。2. promise解决函数异步回调返回值的问题，使得回调函数具备return的功能
  // 将wx.request封装成promise
  request({url,data={},method='GET'}){
        return new Promise((resolve, reject)=>{
            this._request(url,resolve,reject,data, method)
        })
    }
    // 必传参数必须在默认参数之前
    _request(url,resolve, reject, data={}, method='GET',noRefresh = false){
        wx.request({
            url:config.api_base_url + url,
            method:method,
            data:data,
            header:{
                'content-type':'application/json',
                Authorization:this._encode()
            },
            success:(res)=>{
              const code = res.statusCode.toString()
              if (code.startsWith('2')){
                  resolve(res.data)
              }else{
                if (code == '403') {
                  if (!noRefresh) {
                    this._refresh(url, resolve, reject, data, method)
                  }
                }else{
                  reject()
                //   const error_code = res.data.error_code
                //   this._show_error(error_code)
                  this._show_error(res.data.msg)
                }
              }
            },
            fail:(err)=>{
                reject()
                // this._show_error(1)
                this._show_error(err.data.msg)
            }
        })

    }
    // basic64加密
    _encode() {
      // account:password
      // token
      // token:
      const token = wx.getStorageSync('token')
      // 使用base64对token:进行加密
      const base64 = Base64.encode(token + ':')
      return 'Basic ' + base64
    }
    // _show_error(error_code){
    //     if(!error_code){
    //         error_code = 1
    //     }
    //     const tip = tips[error_code]
    //     wx.showToast({
    //         title: tip?tip:tips[1], 
    //         icon:'none',
    //         duration:2000
    //     }) 
    // }
    _show_error(msg) {
        wx.showToast({
          title: msg,
          icon: 'none',
          duration: 500
        })
    }
    _refresh(...param){
      var token = new Token();
      // token.getTokenFromServer((token)=>{
      //   this._request(...param,true);
      // })
        token.getTokenFromServer()
        this._request(...param, true)
    }


}

export {HTTP}

