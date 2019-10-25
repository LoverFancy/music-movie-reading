const util = require('util')
const axios = require('axios')

const { sequelize : db } = require('../../core/db')
const {Sequelize, Model, Op} = require('sequelize')

const { Favor }  =require('./favor')
const { ArtType } = require('../lib/enum')

class Book extends Model{
    // 在自定义Model不要调用构造函数,这是由于sequelize自身的原因会导致查询的时候获取不到字段，这里没用查询所以没有问题，建议不要使用构造函数传递id
    // constructor(id){
    //     super()
    //     this.id = id
    // }
    async detail(id){
        const url = util.format(global.config.yushu.detailUrl, id)
        const detail = await axios.get(url)
        return detail.data
    }

    static async getMyFavorBookCount(uid){
        const count = await Favor.count({
            where:{
                type: ArtType.Book,
                uid
            }
        })
        return count
    }
    // summary=1 是否获取详细信息
    static async searchFromYuShu(q, start, count, summary=1){
        // 格式化参数
        // encodeURI(q)讲中文编码
        const url = util.format(global.config.yushu.keywordUrl, encodeURI(q), start, count, summary)
        // console.log(url)
        const detail = await axios.get(url)
        return detail.data
    }



}

Book.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey:true
    },
    fav_nums:{
        type: Sequelize.INTEGER,
        default: 0
    }
},{
    sequelize: db,
    tableName: 'book'
})

module.exports = {
    Book
}