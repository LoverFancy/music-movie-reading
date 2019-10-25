const Router = require('koa-router')
const router = new Router()

router.get('/v2/classic/latest', (ctx, next) => {
    ctx.body = {
        koa: 'classic2'
    }
})

module.exports = router