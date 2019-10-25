const Router = require('koa-router')

const { RegisterValidator, TokenValidator, NotEmptyValidator, LikeValidator } = require('../../validators/validator')
const { LoginType } = require('../../lib/enum')
const { Favor } = require('../../models/favor')
const { generateToken } = require('../../../core/util')
const { Auth } = require('../../../middlewares/auth')
const { WXManager } = require('../../services/wx')

const { success } = require('../../lib/helper')

const router = new Router({
    prefix: '/v1'
})

router.post('/like', new Auth().m, async (ctx, next) => {
    // ctx.auth.uid是通过令牌获取uid
    // id: 'art_id' 是lin-validator中的别名功能，可以继承PositiveIntegerValidator，会将属性id改为art_id
    const v = await new LikeValidator().validate(ctx, {id: 'art_id'})
    await Favor.like(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid )
    success()
})

router.post('/cancel',new Auth().m, async (ctx, next)=>{
    const v = await new LikeValidator().validate(ctx, {id: 'art_id'})
    await Favor.dislike(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid )
    success()
})


module.exports = router