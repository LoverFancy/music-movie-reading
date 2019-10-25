const {HttpException} = require('../core/http-exception')

// 异常处理中间件的编写
const catchError = async (ctx, next)=>{
    try{
        await next()
    }catch(error){
        // 判断是否是HttpException
        const isHttpException = error instanceof HttpException
        // 是否是开发环境
        const isDev = global.config.environment === 'dev'
        // 开发环境且不是HttpException则抛出错误
        if(isDev && !isHttpException){
            throw error
        }
        // 已知异常
        if(error instanceof HttpException){
            ctx.body = {
                msg: error.msg,
                error_code: error.errorCode,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = error.code
        // 未知异常
        }else{
            ctx.body = {
                msg: 'we made a mistake ........',
                error_code: 999,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = 500
        }
    }
}

module.exports = catchError