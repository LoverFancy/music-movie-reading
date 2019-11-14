import {config} from '../config.js'
import {Base64} from 'js-base64'
import { Token } from '../models/token'
// 定义错误码提高用户体验
// const tips = {
//     1: '抱歉，出现了一个错误',
//     1005:'token无效',
//     3000:'期刊不存在'
// }
// 封装http请求类
class HTTP{
    request(params){
        // url, data, method,
        if(!params.method){
            params.method="GET"
        }
        wx.request({
            url:config.api_base_url + params.url,
            method:params.method,
            data:params.data,
            header:{
                'content-type':'application/json',
                // 'appkey':config.appkey
                Authorization:this._encode()
            },
            // 箭头函数避免this指向
            success:(res)=>{
              console.log(res)
                // 转化为字符串
                let code = res.statusCode.toString()
                if (code.startsWith('2')){
                    // 将res.data返回调用者
                    params.success && params.success(res.data)
                }
                if (code == '403'){
                  
                }
                else{
                    // let error_code = res.data.error_code
                    // this._show_error(error_code)
                    this._show_error(res.data.msg)
                }
            },
            // 5xx
            fail:(err)=>{
                // this._show_error(1)
                this._show_error(err.data.msg)
            }
        })
    }
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
      if(msg){
        wx.showToast({
          title: msg,
          icon: 'none',
          duration: 500
        })
      } 
    }
}

export {HTTP}


















