require('module-alias/register')

const Koa = require('koa')
const parser = require('koa-bodyparser')
const path= require('path')
// 导入init模块
const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')

const static = require('koa-static')
// 导入模型
require('./app/models/user')
require('./app/models/classic')
require('./app/models/flow')

// 实例化对象
const app = new Koa()
app.use(catchError)
app.use(parser())
// 获取静态资源
app.use(static(path.join(__dirname,'./static')))
// 全局的查看路径方法
// console.log(process.cwd())
// 调用静态方法
InitManager.initCore(app)

app.listen(3000)