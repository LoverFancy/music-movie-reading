const {flatten} = require('lodash')

const { Op } = require('sequelize')
const {Movie, Sentence, Music} = require('./classic')
const {HotBook} = require('./hot-book')

// 用于查询实体表信息
class Art{
    constructor(art_id,type){
        this.art_id = art_id
        this.type = type
    }
    // 实例方法可以通过实例的constructor进行传参，静态方法每次都需要传同样的参数。因此实例方法的复用性强
    // get detail(){}
    // 属性操作和上面方法一样，但是调用方式不同属性的调用方式：art.detail 方法调用：art.getDetail()
    // 如果需要传参就需要使用方法的形式
    async getDetail(uid){
        // Favor和Art的互相引用
        const {Favor} = require('./favor')
        const art = await Art.getData(this.art_id,this.type)
        if(!art) {
            throw new global.errs.NotFound()
        }
        const like = await Favor.userLikeIt(this.art_id, this.type, uid)
        // art.setDataValue('like_status',like)
        return {
            art,
            like_status:like
        }
    }
    // 这里不能设计成实例方法，因为getList方法用于处理集合。这里进行静态方法都比较勉强，标准的方法是定义一个集合对象去处理
    static async getList(artInfoList){
        const artInfoObj = {
            // Movie
            100:[],
            // Music
            200:[],
            // Sentence
            300:[],
            // book
            // 400:[]
        }
        // 遍历数组for...of
        for(let artInfo of artInfoList){
            artInfoObj[artInfo.type].push(artInfo.art_id)
        }
        const arts = []
        // 遍历对象for...in
        for(let key in artInfoObj){
            const ids = artInfoObj[key]
            // 空数组不进行查询
            if(ids.length === 0){
                continue
            }
            // 将type字符串变成int,因为所有的对象的key都是字符串
            key = parseInt(key)
            // 这里可能形成多维数组，所以需要展平处理
            arts.push(await Art._getListByType(ids, key))
        }
        // 扁平化处理,将多维数组贬称一维数组
        return flatten(arts)
    }
    // 接收一组id和type进行数据库in查询
    static async _getListByType(ids, type){
        let arts = null
        // 条件
        const finder = {
            where:{
                id: {
                    // 使用in查询避免循环查询数据库
                    [Op.in]:ids
                }
            }
        }
        const scope = 'bh'
        switch (type){
            case 100:
                arts = await Movie.scope(scope).findAll(finder)
                break;
            case 200:
                arts = await Music.scope(scope).findAll(finder)
                break;
            case 300:
                arts = await Sentence.scope(scope).findAll(finder)
                break;
            case 400:
                break;
            default:
                break;
        }

        return arts
    }
    static async getData(art_id, type, useScope = true){

        let art = null
        // 条件
        const finder = {
            where:{
                id: art_id
            }
        }
        const scope = useScope ? 'bh' : null
        switch (type){
            case 100:
                // art = await Movie.scope(scope).findOne(finder) //scope为作用域,有时候会导致语法错误
                art = await Movie.findOne(finder) // 数据库查询问题导致错误,重置数据后回复
                break;
            case 200:
                art = await Music.findOne(finder)
                // art = await Music.scope(scope).findOne(finder)
                break;
            case 300:
                art = await Sentence.findOne(finder)
                // art = await Sentence.scope(scope).findOne(finder)
                break;
            case 400:
                const {Book} = require('./book')
                art = await Book.findOne(finder)
                // art = await Book.scope(scope).findOne(finder) 
                if(!art){
                    art = await Book.create({
                        id:art_id
                    })
                }
                break;
            default:
                break;
        }
        if(art && art.images) {
            let imgUrl = art.dataValues.image
            art.dataValues.image = global.config.host + imgUrl
        }
        return art
    }
}

module.exports = {
    Art
}