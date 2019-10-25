const Router = require('koa-router') 

const router = new Router()

// router.get('/classic/latest',(ctx,next)=>{
//     ctx.body = {key: 'okAPIGet'}
//     // throw new Error('API Exception')
// })

// 参数获取：url只能发送get传递的参数，post可以在body中传参
router.post('/classic/:id/latest',(ctx,next)=>{
    // 获取参数
    // url中间的:id参数
    const path = ctx.params
    // url ?后面的参数
    const query = ctx.request.query
    // 请求header内容
    const headers = ctx.request.header
    // 请求 body的内容，需要使用body-parser中间件
    const body = ctx.request.body
    
    // 定义错误处理
    // if (true) {
    //     // 动态
    //     const error = new Error("错误原因")
    //     error.errorCode = 10002
    //     error.status = 400
    //     error.requestUrl = `${ctx.method} ${ctx.path}`
    //     throw error
    // }

    ctx.body = {key: 'okAPIPost'}
    // throw new Error('Exception')

})
module.exports = router