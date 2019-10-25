const Router = require('koa-router')

const { RegisterValidator } = require('../../validators/validator')
// 导入model以操作数据库
const {User} = require('../../models/user')
const {success} = require('../../lib/helper')

const router = new Router({
    prefix: '/v1/user'
})
/**
*  中间件只在程序启动时初始化一次
*/
router.post('/register', async (ctx, next) => {
    // 这里必需是异步，否则无法等待异步校验结果(查询数据库)返回就继续执行结果，所以这里必需await阻断进程。
    const v = await new RegisterValidator().validate(ctx)  //每个请求有独立的校验,每次请求都会实例化校验器.如果校验器以中间件的形式实现，则只会初始化一次,全局只有一个校验器。这就会导致前面请求的校验器的属性值被后面请求替换导致错误，从而出错。
    // 获取到用户的参数
    const user = {
        email: v.get('body.email'),
        password: v.get('body.password1'),
        nickname: v.get('body.nickname')
    }
    // 将user信息存入数据库，是异步的过程
    await User.create(user)
    // throw new global.errs.Success()
    // 同上,这里只不过将错误包装成函数返回出来
    success()
    // 或者直接使用下面的形式
    // ctx.body = {

    // }
})

module.exports = router