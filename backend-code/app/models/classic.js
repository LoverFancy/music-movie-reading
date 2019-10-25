// music sentence movie 合成 classic模型

const bcrypt = require('bcryptjs')

const { sequelize : db } = require('../../core/db')
const {Sequelize, Model} = require('sequelize')
// 共同的属性
const classicFields = {
    // 图片地址
    image: Sequelize.STRING,
    // 内容
    content: Sequelize.STRING,
    // 出版日期
    pubdate: Sequelize.STRING,
    // 点赞数
    fav_nums: {
        type: Sequelize.INTEGER,
        default: 0
    },
    // 标题
    title: Sequelize.STRING,
    // 类型
    type: Sequelize.STRING,
}

class Movie extends Model{

}
Movie.init(classicFields, {
    sequelize: db,
    tableName: 'movie'
})

class Sentence extends Model{

}
Sentence.init(classicFields, {
    sequelize: db,
    tableName: 'sentence'
})

const MusicFields = Object.assign({
    // music 播放url
    url: Sequelize.STRING
}, classicFields)
class Music extends Model{

}
Music.init(MusicFields, {
    sequelize: db,
    tableName: 'music'
})

module.exports = {
    Movie,
    Sentence,
    Music,
}