const Router = require('koa-router')

const { RegisterValidator, TokenValidator, NotEmptyValidator } = require('../../validators/validator')
const { LoginType } = require('../../lib/enum')
const { User } = require('../../models/user')
const { generateToken } = require('../../../core/util')
const { Auth } = require('../../../middlewares/auth')
const {WXManager} = require('../../services/wx')

const { success } = require('../../lib/helper')

const router = new Router({
    prefix: '/v1/token'
})
// 获取令牌，使用post是因为携带了用户的信息会安全些，使用get也可以
router.post('/', async (ctx, next) => {
    const v = await new TokenValidator().validate(ctx)
    let token 
    switch (v.get('body.type')) {
        // 邮箱登陆
        case LoginType.USER_EMAIL:
            token = await emailLogin(v.get('body.account'), v.get('body.secret'))
            break;
        // 小程序登陆
        case LoginType.USER_MINI_PROGRAM:
            // 这里的account代表小程序前台传回的code码
            token = await WXManager.codeToToken(v.get('body.account'))
            break;
        default:
            throw new global.errs.ParameterException('没有响应的处理函数')
    }
    ctx.body =  {
        token
    }
})
// 专门验证令牌是否有效的接口
router.post('/verify', async (ctx, next)=>{
    // token的非空验证
    const v = await new NotEmptyValidator().validate(ctx)
    const result = Auth.verifyToken(v.get('body.token'))
    ctx.body = {
        is_valide: result
    }
})

async function emailLogin(account, secret) {
    // 静态方法的调用类名.方法名
    const user = await User.verifyEmailPassword(account, secret)
    // Auth.USER是权限码,携带令牌设置访问API的权限
    return generateToken(user.id, Auth.USER)
}
module.exports = router