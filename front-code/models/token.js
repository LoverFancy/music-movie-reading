import {config} from '../config'
import {HTTP} from '../util/http-p.js'
class Token extends HTTP{
    getTokenFromServer(){
        wx.login({
            success: res => {
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              return this.request({
                url: `token`,
                method: "POST",
                data: {
                  account: res.code,
                  type: 100
                },
              })
              .then((res)=>{
                wx.setStorageSync('token', res.token)
              })
                // wx.request({
                //     url: `${config.api_base_url}token`,
                //     method:"POST",
                //     data:{
                //         account:res.code,
                //         type:100    
                //     },
                //     success:(res)=>{
                //         // console.log(res.data)
                //         // 判断状态码是2xx才能确定是成功返回
                //         const code = res.statusCode.toString()
                //         if(code.startsWith('2')){
                //             // 将token存储到微信缓存中
                //             wx.setStorageSync('token',res.data.token)
                //         }
                //     },
                //     fail:(err)=>{
                //         wx.showToast({
                //             title: err,
                //             icon: 'none',
                //             duration: 2000
                //           })
                //     }
                // })
            }
        })
    }
    verifyToken(){
      return this.request({
        url: `token/verify`,
        method: "POST",
        data: {
          token: wx.getStorageSync("token")
        },
      })
      .then((res) => {
        if (!res.is_valide){
          this.getTokenFromServer()
        } 
      })
    }
}

export {
    Token
}