// nodejs util工具
const util = require('util')

const axios = require('axios')

const config = require('../../config/config')
const {User} = require('../models/user')
const {generateToken} = require('../../core/util')
const {Auth} = require('../../middlewares/auth')
// 管理wx登录类
class WXManager{
    // 小程序登录是不需要email和password,只需要前端发送一个小程序生成的code码
    // 后台调用wx服务器去验证code码是否合法。合法wx服务器会返回openid唯一标识
    static async codeToToken(code){ 
        // 传递到wx服务器的url要求:loginUrl,AppID,AppSecret,code
        // util.format()格式化
        const url = util.format(config.wx.loginUrl, config.wx.AppID, config.wx.AppSecret, code)
        // 发送http请求到微信服务器,调用微信的服务
        const result = await axios.get(url)
        if(result.status !== 200){
            throw new global.errs.AuthFailed('openid获取失败')
        }
        const errcode = result.data.errcode
        const errmsg = result.data.errmsg
        // result.data.errcode存在且不为0 说明请求成功并合法
        if(errcode && errcode !== 0){
            throw new global.errs.AuthFailed('openid获取失败: ' + errmsg)
        }
        // 查询数据库是否有openid
        let user = await User.getUserByOpenid(result.data.openid)
        console.log(user)
        // 不存在就注册openid到数据库
        if(!user){
            user = await User.registerByOpenid(result.data.openid)
        }

        return generateToken(user.id, Auth.USER)
    }
}

module.exports = {
    WXManager
}