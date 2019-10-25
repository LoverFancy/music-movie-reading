// 封装基于类的校验器
const {
    Rule,
    LinValidator
} = require('../../core/lin-validator-v2')
// 导入User模型以操作数据库
const { User } = require('../models/user')
const { LoginType, ArtType } = require('../lib/enum')

class PositiveIntegerValidator extends LinValidator {
    constructor() {
        // 子类要使用this，必须super()
        super()
        this.id = [
            new Rule('isInt', '需要是正整数', { min: 1 })
        ]
    }
}

class RegisterValidator extends LinValidator {
    constructor() {
        super()
        this.email = [
            new Rule('isEmail', '不符合Email规范')
        ]
        this.password1 = [
            new Rule('isLength', '密码6-32个字符', { min: 6, max: 32 }),
            new Rule('matches', '密码不符合规范^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]'),
        ]
        this.password2 = this.password1
        this.nickname = [
            new Rule('isLength', '昵称6-32个字符', { min: 6, max: 32 })
        ]
    }

    validatePassword(vals) {
        const psw1 = vals.body.password1
        const psw2 = vals.body.password2
        if (psw1 !== psw2) {
            throw new Error('两个密码必须相同')
        }
    }

    async validateEmail(vals) {
        const email = vals.body.email
        // 查询数据库异步，通过User模型进行查询
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if (user) {
            throw new Error('email 已经存在')
        }
    }
}

class TokenValidator extends LinValidator {
    constructor() {
        super()
        this.account = [
            new Rule('isLength', '不符合规则', { min: 4, max: 32 })
        ]
        this.secret = [
            // secret是否必需传入
            // 一般web网站是账号+密码登陆
            // 但现在是多元化的登陆方式，如各种登陆方式：小程序登陆就不需要密码，只需要确定用户身份即可，那么有哪些形式呢
            // web accout+secret
            // acount
            // 手机登录
        
            // 当可以传可以不传时使用isOptional，这是lin-validator中写的
            new Rule('isOptional'),
            new Rule('isLength', '至少6个字符', { min: 6, max: 128 })
        ]
        // this.type
    }
    // 通过type去判断用户登陆方式 type使用js模拟枚举形式
    validateLoginType(vals) {
        if (!vals.body.type) {
            throw new Error('type是必须参数')
        }
        if(!LoginType.isThisType(vals.body.type)){
            throw new Error('type参数不对')
        }
    }
}

class NotEmptyValidator extends LinValidator {
    constructor() {
        super()
        this.token = [
            new Rule('isLength', '不能为空', { min: 1})
        ]
    }
}

function checkType(vals) {
    let type = vals.body.type || vals.path.type
    if (!type) {
        throw new Error('type是必须参数')
    }
    // 将字符串转化成整型
    type = parseInt(type)
    // this.parsed.path.type = type
    if(!LoginType.isThisType(type)){
        throw new Error('type参数不对')
    }
}
function checkArtType(vals) {
    let type = vals.body.type || vals.path.type
    if (!type) {
        throw new Error('type是必须参数')
    }
    type = parseInt(type)
    // this.parsed.path.type = type
    if(!ArtType.isThisType(type)){
        throw new Error('type参数不对')
    }
}
// 通过类去判断loginType还是ArtType
// class Checker {
//     constructor(type){
//         this.enumType = type
//     }
//     check(vals){
//         let type = vals.body.type || vals.path.type
//         if (!type) {
//             throw new Error('type是必须参数')
//         }
//         type = parseInt(type)
//         // this.parsed.path.type = type
//         if(!this.enumType.isThisType(type)){
//             throw new Error('type参数不对')
//         }
//     }
// }

class LikeValidator extends PositiveIntegerValidator {
    constructor() {
        super()
        // const checker = new Checker(ArtType)
        // // 绑定this的指向checker类
        // this.validateType = checker.check.bind(checker)

        this.validateType = checkArtType
    }
}

class SearchValidator extends LinValidator{
    constructor(){
        super()
        // 查询关键字
        this.q = [
            new Rule('isLength', '搜索关键字不能空', {
                min: 1,
                max: 16
            })
        ]
        // 开始的条目
        this.start = [
            new Rule('isInt', 'start need int .' ,{min:0, max: 60000}),
            // isOptional是可选参数，传需要符合校验标准
            new Rule('isOptional', '', 0)
        ]
        // 结束的条目
        this.count = [
            new Rule('isInt', 'count need int', {min: 1, max: 20}),
            new Rule('isOptional', '', 20)
        ]
    }
}

class AddShortCommentValidator extends PositiveIntegerValidator{
    constructor() {
        super()
        this.content = [
            new Rule('isLength', '必须在1到12个字符之间', {
                min: 1,
                max: 12
            })
        ]
    }
}

module.exports = {
    PositiveIntegerValidator,
    RegisterValidator,
    TokenValidator,
    NotEmptyValidator,
    LikeValidator,
    SearchValidator,
    AddShortCommentValidator
}