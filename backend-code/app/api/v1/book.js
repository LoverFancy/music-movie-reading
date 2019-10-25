const Router = require('koa-router')
const {
    PositiveIntegerValidator,
    LikeValidator,
    SearchValidator,
    AddShortCommentValidator
} = require('../../validators/validator')

const { HotBook } = require('@models/hot-book')
const { Book } = require('@models/book')
const { Comment } = require('@models/book-comment')
const { Favor } = require('@models/favor')

const { Auth } = require('@middlewares/auth')

const {success} = require('../../lib/helper') 
const router = new Router({
    prefix: '/v1/book'
})

// 图书的基础数据很多，大量的书籍本身数据显然不应该放到我们当前的的数据库中，而应该将基础数据
// 做成服务的形式给我们的业务提供基础数据
// 也可以使图书成为公用性的api,不仅仅提供给我们自己的项目

// 热门书籍接口
router.get('/hot_list', async (ctx, next) => {
    const books = await HotBook.getAll()
    ctx.body = books
})
// 书籍详情
router.get('/:id/detail', async (ctx, next) => {
    const v = await new PositiveIntegerValidator().validate(ctx)
    const book = new Book()
    ctx.body = await book.detail(v.get('path.id'))
})
// 从书籍服务器搜索书籍
router.get('/search', async (ctx, next) => {
    const v = await new SearchValidator().validate(ctx)
    const res = await Book.searchFromYuShu(v.get('query.q'), v.get('query.start'), v.get('query.count'))
    ctx.body = res
})
// 获取喜欢书籍的数量
router.get('/favor/count', new Auth().m, async ctx => {
    const count = await Book.getMyFavorBookCount(ctx.auth.uid)
    ctx.body = {
        count
    }
})
// 获取获取喜欢书籍的点赞数量和状态
router.get('/:book_id/favor', new Auth().m, async ctx => {
    const v = await new PositiveIntegerValidator().validate(ctx, {
        id: 'book_id'
    })
    const favor = await Favor.getBookFavor(ctx.auth.uid, v.get('path.book_id'))
    ctx.body = favor
})
// 提交短评接口
router.post('/add/short_comment', new Auth().m, async ctx => {
    const v = await new AddShortCommentValidator().validate(ctx, {
        id: 'book_id'
    })
    Comment.addComment(v.get('body.book_id'), v.get('body.content'))
    success()
})
// 获取短评接口
router.get('/:book_id/short_comment', new Auth().m, async ctx => {
    const v = await new PositiveIntegerValidator().validate(ctx, {
        id: 'book_id'
    })
    const book_id = v.get('path.book_id')
    const comments = await Comment.getComments(book_id)
    ctx.body = {
        comments,
        book_id
    }
})
// 推荐和热搜涉及到参考算法和人工的处理方面比较复杂
router.get('/hot_keywords',async ctx=>{
    ctx.body = {
        'hot':['哈利波特','东野圭吾','村上春树','白夜行','金庸','古龙']
    }
})

module.exports = router