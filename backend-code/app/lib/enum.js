// 模拟枚举类型

// 判断是否时当前类型的函数
function isThisType(val){
    for(let key in this){
        if(this[key] === val){
            return true
        }
    }
    return false
}

const LoginType = {
    USER_MINI_PROGRAM: 100,
    USER_EMAIL: 101,
    USER_MOBILE: 102,
    ADMIN_EMAIL: 200,
    isThisType: isThisType
}

const ArtType = {
    MOVIE: 100,
    MUSIC: 200,
    Sentence: 300,
    Book: 400,
    isThisType: isThisType

}

module.exports = {
    LoginType,
    ArtType
}