const Koa = require('koa')
// const Router = require('koa-router') 
const parser = require('koa-bodyparser')
//全局异常处理
const catchError = require('./middleErrorException')
// 实例化对象
const app = new Koa()

// app.use(async (ctx,next)=>{
//     // console.log(ctx.path)
//     // console.log(ctx.method)
//     // 这种方法只适用于简单的请求状态，当有很多路由就不能简单用if去判断了，需要使用router
//     if (ctx.path === '/classic/latest' && ctx.method === 'GET'){
//         // return 'ok'
//         // 返回客户端内容
//         // ctx.body = "OK"
//         // 如何返回json? => 将一个js对象返回到body中,koa内部会自动序列化
//         ctx.body = {key: 'ok'}
//     }
// })

// 些router的三部曲：实例化router，编写router中间件函数，注册router中间件到app对象上
// 实例化Router
// const router = new Router()

// router.get('/classic/latest',(ctx,next)=>{
//     ctx.body = {key: 'ok'}
// })
app.use(catchError)
// body-parser中间件
app.use(parser())
// 模块化router
const router = require('./testRouter')
// 注册路由
app.use(router.routes())

// 自动注册路由require-directory的用法
// const requireDirectory = require('require-directory')
// const modules = requireDirectory(module,'./app/api/v2',{
//     visit:whenLoadModel
// })
// // 每次导入模块都会调用whenLoadModel函数
// function whenLoadModel(obj){
//     // 判断模块是不是Router的实例，从而确定是否导入路由模块
//     if(obj instanceof Router){
//         app.use(obj.routes())
//     }
// }


// 全局process变量获取路径
//process.cwd() // 选中process.cwd()右键可以调试：求值得到表达式的值："d:\demo\My-Node-Code\oldIsland\koa2-island-master"
app.listen(3000)