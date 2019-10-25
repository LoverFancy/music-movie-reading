// 解析客户端传回的通过postman的Authorization加密的token
const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

// 编写API保护的Auth中间件去进行权限的控制与检测
// 实际是通过访问API携带的令牌去判断权限
// 将权限控制作为类方便扩展,通过获取m属性返回中间件函数
class Auth{
    // 权限分级
    constructor(level){
        // 默认的权限等级,如果API需要特定的权限等级，则通过new Auth(10)传入，从而规定API的权限等级
        this.level = level || 1
        // 定义类变量
        Auth.USER = 8
        Auth.ADMIN = 16
        // Auth.SUPER_ADMIN = 32
    }
    get m(){
        // 返回中间件函数,在函数中检测token是否合法
        return async(ctx, next)=>{
            // 前后端约定如何传递token(body,header等)
            // http规定有个天然的身份验证机制，HttpBasicAuth=>传递是通过http header传递
            const userToken = basicAuth(ctx.req) // ctx.req获取的是node.js原生的请求,ctx.request为koa处理过的请求对象
            // console.log('userToken: ', userToken)
            let errMsg = 'token不对'
            if(!userToken || !userToken.name){
                throw new global.errs.Forbbiden(errMsg)
            }
            try{
                // jwt.verify()函数会返回一个变量,这个就是我们放入token中的数据
                var decode = jwt.verify(userToken.name, global.config.security.secretKey)
                // console.log('decode: ', decode)
            }catch(error){
                // token过期
                if(error.name == 'TokenExpiredError'){
                    errMsg = 'token过期'
                }
                throw new global.errs.Forbbiden(errMsg )
            }
            // API的权限判断
            if(decode.scope < this.level){
                errMsg = '权限不足'
                throw new global.errs.Forbbiden(errMsg )
            }
            // 将uid和scope放到ctx的auth中方便后面获取
            ctx.auth = {
                uid: decode.uid,
                scope: decode.scope
            }
            // 调用下一个中间件
            await next()
        }
    }
    // 用于给客户端验证令牌的静态方法,返回true说明令牌有效,抛出错误则返回false令牌无效
    static verifyToken(token){
        try{
            var d = jwt.verify(token, global.config.security.secretKey)
            return true
        }catch(error){
            return false
        }
    }
}

module.exports = {
    Auth
}