// 使用sequelize必需安装mysql2,使用npm安装即可，作为驱动
const { Sequelize, Model } = require('sequelize')
const { unset, clone, isArray } = require('lodash')

const {
    dbName,
    host,
    port,
    user,
    password
} = require('../config/config').database

const sequelize = new Sequelize(dbName, user, password, {
    // 数据库的类型
    dialect: 'mysql',
    host,
    port,
    // 显示操作数据库的命令
    logging: true,
    // 时区
    timezone: '+08:00',
    define: {
        // createdAt updatedAt // deletedAt 是否创建时间记录
        timestamps: true,
        // 删除记录
        paranoid: true,
        // 别名
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        //驼峰转下划线
        // underscored: true,
        //否在数据库中创建复数表名
        freezeTableName: false,
        // scope为作用域
        scopes: {
            // 作用域字段名
            bh: {
                // 属性
                attributes: {
                    // 排除的查询字段
                    exclude: [
                        'updated_at', 'created_at', 'deleted_at',
                        // 'createdAt', 'updatedAt', 'deletedAt'
                    ]
                }
            }
        }
    },

})
// Model原型上定义toJSON方法从而自定义返回的字段
Model.prototype.toJSON = function(){
    let data = clone(this.dataValues)
    // 删除某个字段
    unset(data, 'updated_at')
    unset(data, 'created_at')
    unset(data, 'deleted_at')
    // 处理图片的地址
    for(let key in data){
        if(key === 'image'){
            // 非网络资源图片
            if(!data[key].startsWith('http')){
                // img进行拼接非常特殊
                data[key] = global.config.host + data[key]
            }
        }
    }
    // 通过this.exclude拿到挂载的字段并判断是否是数组
    if(isArray(this.exclude)){
        this.exclude.forEach(value => {
            unset(data, value)
        })
    }

    return data
}

sequelize.sync({
    force: false //把原来表删除 重新创建
})

module.exports = {
    sequelize
    // db:sequelize
}