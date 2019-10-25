// 用户模型
const bcrypt = require('bcryptjs')
// sequelize实例
const { sequelize : db } = require('../../core/db')
// 与上面一样
// import {sequelize as db} from '../../core/db'

// 原始的Sequelize对象
const {Sequelize, Model} = require('sequelize')

class User extends Model{
    // 静态方法的调用类名.方法名
    // 验证邮箱密码
    static async verifyEmailPassword(email, plainPassword){
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if(!user){
            throw new global.errs.AuthFailed('账号不存在')
        }
        // 解密判断密码
        const correct = bcrypt.compareSync(plainPassword, user.password)
        if(!correct){
            throw new global.errs.AuthFailed('密码不对')
        }
        return user
    }
    // 验证openid
    static async getUserByOpenid(openid){
        return await User.findOne({where: {openid: openid}})
    }
    // 注册openid
    static async registerByOpenid(openid){
        // 注册openid到数据库
        return await User.create({
            openid: openid
        })
    }

}
// 定义id,姓名，邮箱等等
User.init({
    id:{
        // 主键如果使用比较长的随机字符串，如guid会降低查询的性能。可以自己设计编号系统的id
        // 如果自己设计的在多用户注册时1000可能会导致同id，从而报错。自增担心暴露id编号。
        // 如何使别人知道用户编号也无法攻击，如何进行接口的保护
        type: Sequelize.INTEGER,
        // 主键
        primaryKey: true,
        // 自增
        autoIncrement: true
    },
    nickname: Sequelize.STRING,
    email: {
        type: Sequelize.STRING(128),
        unique: true
    },
    password: {
        //观察者模式
        type: Sequelize.STRING,
        // 模型的set操作
        set(val){
            // 加密盐，数字代表加密等级默认10
            const salt = bcrypt.genSaltSync(10)
            //*  原密码 相同， 加密后不相同
            const pwd = bcrypt.hashSync(val, salt) 
            this.setDataValue('password', pwd)
        }
    },
    // wx的openid
    openid:{
        type: Sequelize.STRING(64),
        unique: true
    }
},{sequelize: db, tableName: 'user'})

module.exports = {
    User
}