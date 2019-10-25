const { sequelize : db } = require('../../core/db')
const {Sequelize, Model, Op} = require('sequelize')
const { Favor } = require('./favor')

class HotBook extends Model{
    // 获取所有的热门书籍
    static async getAll(){
        const books = await HotBook.findAll({
            order: [
                'index'
            ]
        })
        const ids = []
        // 取出所有热门书籍的id
        // forEach内部不能使用异步(不要使用async/await)，因为不会等待返回数据
        books.forEach(book =>{
            ids.push(book.id)
        })
        // 获取所有热门书籍的点赞数量
        const favors = await Favor.findAll({
            where:{
                art_id:{
                    // in方法查询，不能用循环的方式每个id去查询数据库
                    [Op.in]: ids,
                },
                type:400
            },
            // group分组查询
            group: ['art_id'],
            //  attributes确定Sequelize擦汗寻出来的字段,Sequelize.fn('COUNT', '*')方法对字段进行求和
            attributes: ['art_id', [Sequelize.fn('COUNT', '*'), 'count'] ]
        })
        // 点赞后的favor art_id count
        // return favors
        // 循环books得到每个book的count
        books.forEach(book => {
            HotBook._getEachBookStatus(book, favors)
        })

        return books
    }
    // 通过id匹配循环找到book状态
    static _getEachBookStatus(book, favors){
       let count = 0
       favors.forEach(favor => {
           if(book.id === favor.art_id){
               // id相等说明已点赞，将favor中的count赋值给count变量后面存入book中
               count = favor.get('count')
           }
       })
        book.setDataValue('fav_nums', count)
        return book
    }

}

HotBook.init({
    // 用于排序的index
    index: Sequelize.INTEGER,
    // 封面图
    image: Sequelize.STRING,
    author: Sequelize.STRING,
    title: Sequelize.STRING,

}, {
    sequelize: db,
    tableName: 'hot_book'
})

module.exports = {
    HotBook
}