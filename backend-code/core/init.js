// 导入多个API路由
const requireDirectory = require('require-directory')
const Router = require('koa-router')

// 初始化操作
class InitManager {
    // 静态方法：定义入口方法
    static initCore(app) {
        // 在类里面调用静态方法：类名+方法名
        InitManager.app = app  // 将app保持到InitManager类上
        // 加载路由的方法   
        InitManager.initLoadRouters()
        InitManager.loadHttpException()
        InitManager.loadConfig()
        InitManager.loadEnum()
    }
    static initLoadRouters() {
        const apiDirectory = `${process.cwd()}/app/api`
        requireDirectory(module, apiDirectory, { visit: whenLoadModule });

        function whenLoadModule(obj) {
            if (obj instanceof Router) {
                InitManager.app.use(obj.routes())
            }
        }
    }
    static loadHttpException(){
        const errors = require('./http-exception')
        // 将所有的错误类保存到全局
        global.errs = errors    
    }
    static loadConfig(path = ''){
        const configPath = path || process.cwd() + '/config/config.js'
        const config = require(configPath)
        global.config = config
    }
    static loadEnum(){
        const enumPath = process.cwd() + '/app/lib/enum.js'
        global.enum = require(enumPath)
    }
}

module.exports = InitManager