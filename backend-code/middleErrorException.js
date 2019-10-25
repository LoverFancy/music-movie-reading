const catchError = async (ctx,next)=>{
    try {
        await next()
    } catch (error) {

        if(error.errorCode){
            ctx.body = {
                msg: error.message,
                error_code: error.errorCode,
                request: error.requestUrl,
            }
            ctx.status = error.status
        }
        // ctx.body="服务器有点异常,请等一下"
        // error 堆栈调用信息
        // HTTP Status Code 2xx 4xx 5xx
        // message
        // error_code 详细定义错误
        // request_url 当前请求的url

        // 已知型错误：参数错误，无法通过验证等等
        // 可以明确处理错误 try...catch
        // 未知型错误：程序潜在型错误,连接数据库出错等等
        // 全局异常处理
    }
}

module.exports = catchError