const bcrypt = require('bcryptjs')


const { sequelize : db } = require('../../core/db')
const {Sequelize, Model, Op} = require('sequelize')
// 小心Art和Favor的互相引用
const { Art } = require('./art')

class Favor extends Model{
    // 点赞
    static async like(art_id, type, uid){
        // 局部引入
        const { Art } = require('./art')
            // 查询是否已经点赞
        const favor = await Favor.findOne({
            where:{
                art_id,
                type,
                uid
            }
        })
        // 已点赞抛出错误
        if(favor){
            throw new global.errs.LikeError()
        }
        //sequelize对数据库事务操作
        return db.transaction(async (t) => {
            // 插入点赞记录
            await Favor.create({
                art_id,
                type,
                uid}, {transaction: t})
            // 找到点赞期刊
            // const art = await Art.getData(art_id, type,false)
            const art = await Art.getData(art_id, type,true) 
            // art是sequelize的Model,对其fav_nums字段 +1
            // by代表是变化的梯度
            await art.increment('fav_nums', {by: 1, transaction: t})
        })

    }
    // 取消点赞
    static async dislike(art_id, type, uid){
        // 局部引入
        const { Art } = require('./art')
        // 返回查询结果
        const favor = await Favor.findOne({
            where:{
                art_id,
                type,
                uid
            }
        })

        if(!favor){
            throw new global.errs.DislikeError()
        }

        return db.transaction(async (t) => {
            // 删除该条记录
            await favor.destroy({
                // 软硬删除
                force: true,
                transaction: t
            })
            // const art = await Art.getData(art_id, type, false)
            const art = await Art.getData(art_id, type)
            await art.decrement('fav_nums', {by: 1, transaction: t})
        })
    }
    // 获取是否点赞的状态
    static async userLikeIt(art_id, type, uid){
        const favor = await Favor.findOne({
            where:{
                art_id,
                type,
                uid
            }
        })
        return favor ? true : false

    }
    // 获取喜欢的期刊列表
    static async getMyClassicFavors(uid){
        // 局部引入
        const { Art } = require('./art')
        // 获取所有的art信息
        const arts = await Favor.findAll({
            where:{
                uid,
                type:{
                    // 不包含书籍的点赞 Op.not是sequelize中的非判断
                    [Op.not]:400
                    // []代表Symbol类型
                }
            }
        })
        if(!arts){
            throw new global.errs.NotFound()
        }
        // 如果使用循环查询数据库要特别小心,这是非常危险的行为，要避免。因为查询数据库的次数不可控，受到前端的影响
        // for(let art of arts){
        //     Art.getData()
        // }
        // 获取art的实体信息
        return await Art.getList(arts)

    }
    // 获取喜欢书籍的点赞数量和状态
    static async getBookFavor(uid, bookID){
        const favorNums = await Favor.count({
            where: {
                art_id:bookID,
                type:400
            }
        })
        const myFavor = await Favor.findOne({
            where:{
                art_id:bookID,
                uid,
                type:400
            }
        })
        return {
            fav_nums:favorNums,
            like_status:myFavor?1:0
        }
    }

}
Favor.init({
    // 用户
    uid:Sequelize.INTEGER,
    // 期刊id
    art_id:Sequelize.INTEGER,
    // 期刊类型
    type:Sequelize.INTEGER,

}, {
    sequelize: db,
    tableName: 'favor'
})


module.exports = {
    Favor
}