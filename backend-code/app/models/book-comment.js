const { sequelize : db } = require('../../core/db')
const {Sequelize, Model, Op} = require('sequelize')

class Comment extends Model{
    // 提交短评
    static async addComment(bookID, content){
        const comment = await Comment.findOne({where:{book_id: bookID, content}})
        if(!comment){
            return await Comment.create({
                book_id: bookID,
                content,
                nums:1
            })
        // 相同评论则+1操作
        }else{
            return await comment.increment('nums', {
                by: 1
            })
        }
    }
    // 获取短评
    static async getComments(bookID){
        const comments = await Comment.findAll({
            where:{
                book_id:bookID
            }
        })
        return comments
    }
    // 决定返回的字段
    // toJSON(){
    //     return {
    //       content:this.getDataValue('content'),
    //       nums:this.getDataValue('nums'),
    //     }
    // }
}
// 调用原型上的exclude方法排除字段
Comment.prototype.exclude = ['book_id', 'id']

Comment.init({
    content:Sequelize.STRING(12),
    nums:{
        type:Sequelize.INTEGER,
        defaultValue:0
    },
    book_id:Sequelize.INTEGER,
},{
    sequelize: db,
    tableName: 'comment'
})

module.exports = {
    Comment
}