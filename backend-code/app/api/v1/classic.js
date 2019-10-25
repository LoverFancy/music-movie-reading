const Router = require('koa-router')

const { HttpException, ParameterException } = require('../../../core/http-exception')
const { PositiveIntegerValidator, LikeValidator } = require('../../validators/validator')

const {Flow} = require('../../models/flow')
const {Art} = require('../../models/art')
const {Favor} = require('../../models/favor')
const { Auth } = require('../../../middlewares/auth')

const router = new Router({
    prefix: '/v1/classic'
})

// api权限9，user权限8 权限不足
// router可以使用多个中间件，new Auth().m 将权限中间件引入路由中(这里m不加括号,因为在类中m代表的是属性,只不过这个属性是个函数)
router.get('/latest', new Auth().m, async (ctx, next) => {
    // 对flow数据进行排序 
    // 对数据flow期刊按照index进行排序：1,2,3,...,max
    // max,...,3,2,1 取倒序的第一个即为index最大的一个
    const flow = await Flow.findOne({
        order:[
        // 按照index倒序进行排序
            ['index', 'DESC']
        ]
    })
    
    // const art = await Art.getData(flow.art_id, flow.type)
    // 将index附到art上,js是动态语言 序列化 对象 json
    // art.dataValues.index = flow.index
    // ctx.body = art
    const likeLatest = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid)
    const condition = {
        order: [
            ['index', 'DESC']
        ]
    }
    const art = await Flow.getData(condition, ctx.auth.uid);
    art.setDataValue('index', flow.index)
    art.setDataValue('like_status', likeLatest)
    ctx.body = art

    // ctx.body = {
    //     // test
    //     test: "接口ok",
    //     auth:ctx.auth
    // }
})
// 获取下一期
router.get('/:index/next', new Auth().m, async(ctx, next)=>{
    const v = await new PositiveIntegerValidator().validate(ctx, {id: 'index'})
    const index = v.get('path.index')
    /*const flow = await Flow.findOne({
        where:{
            index: index + 1
        }
    })
    if(!flow){
        throw new global.errs.NotFound()
    }
    const art = await Art.getData(flow.art_id, flow.type)
    const likeLatest = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid)
    art.setDataValue('index', flow.index)
    art.setDataValue('like_status', likeLatest)

    ctx.body = {
        art
    }*/

    const condition = {
        where: {
            index: index + 1
        }
    }
    const art = await Flow.getData(condition, ctx.auth.uid);
    ctx.body = art
})
// 获取上一期
router.get('/:index/previous', new Auth().m, async(ctx, next)=>{
    // 实例化校验类
    const v = await new PositiveIntegerValidator().validate(ctx, {id: 'index'})
    // 使用验证器获取参数
    const index = v.get('path.index')
    const flow = await Flow.findOne({
        where:{
            index: index - 1
        }
    })
    if(!flow){
        throw new global.errs.NotFound()
    }
    const art = await Art.getData(flow.art_id, flow.type)
    // 点赞状态
    const likeLatest = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid)
    art.setDataValue('index', flow.index)
    art.setDataValue('like_status', likeLatest)

    ctx.body = art
})
// 获取点赞信息
router.get('/:type/:id/favor', new Auth().m, async(ctx, next)=>{
    const v = await new  LikeValidator().validate(ctx)
    const id = v.get('path.id')
    // 将字符串转化为数字否则验证会不通过,lin-validator内需要知道需要转化的类型才会自动转化类型
    const type = parseInt(v.get('path.type'))
    // 封装查询期刊信息为一个Art的实例方法
    const artDetail =await new Art(id,type).getDetail(ctx.auth.uid)
    ctx.body = {
        fav_nums: artDetail.art.fav_nums,
        like_status: artDetail.like_status
    }
})
// 所有喜欢的期刊列表
router.get('/favor', new Auth().m, async(ctx, next) => {
    const uid = ctx.auth.uid
    ctx.body = await Favor.getMyClassicFavors(uid)
})
// 获取某一期期刊详细信息
router.get('/:type/:id', new Auth().m, async(ctx, next) => {
    const v = await new  LikeValidator().validate(ctx)
    const id = v.get('path.id')
    const type = parseInt(v.get('path.type'))

    // 封装查询期刊信息为一个Art的实例方法
    const artDetail =await new Art(id,type).getDetail(ctx.auth.uid)
    artDetail.art.setDataValue('like_status',artDetail.like_status)
    // 根据当前id，type获取Flow表中的index
    const flow = await Flow.findOne({
        where:{
            art_id:id,
            type:type
        }
    })
    artDetail.art.setDataValue('index',flow.index)
    ctx.body = artDetail.art
})

module.exports = router