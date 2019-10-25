module.exports = {
    // prod
    environment: 'dev',
    database: {
        dbName: 'island',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'zoujie123'
    },
    // 定义token的私钥
    security:{
        // 最好是没规律的字符串如uuid
        secretKey: 'abceffg',
        // 24*30小时 有效时间
        expiresIn: 60*60*24*30
    },
    // 微信的相关配置
    wx:{
        AppID: 'wx6552c8d6cf40b1df',
        AppSecret: 'd55eb0e7be0e836bc9d063090708df17',
        // loginUrl
        // loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code',
        // 将需要修改的部分使用%s占位符占位
        loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    },
    yushu:{
        detailUrl:'http://t.yushu.im/v2/book/id/%s',
        keywordUrl:'http://t.yushu.im/v2/book/search?q=%s&start=%s&count=%s&summary=%s'
    },
    host:'http://localhost:3000/'
}
// GET 
// https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
