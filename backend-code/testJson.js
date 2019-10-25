const objToString = {
    name: 'test',
    age: 22,
    // 对象的toJSON方法
    toJSON: function(){
        return {
            name1: 'test1'
        }
    }
}
// 将js对象转化成json字符串：stringify方法序列化的对象取决于对象中的toJSON方法返回的内容
// console.log(JSON.stringify(objToString))
// 因此每次接口返回的内容都可以通过toJSON方法去控制模型Model返回的字段：如book-comment模型中的示例
// toJSON(){
//     return {
//       content:this.getDataValue('content'),
//       nums:this.getDataValue('nums'),
//     }
// }
// 上面的方式需要在每个继承的Model类上面定义toJSON方法还是比较麻烦，更好的做法是在Model的原型上定义toJSON方法
// const { unset, clone, isArray } = require('lodash')
// Model.prototype.toJSON = function(){
//     let data = clone(this.dataValues)
//     unset(data, 'updated_at')
//     unset(data, 'created_at')
//     unset(data, 'deleted_at')

//     for(let key in data){
//         if(key === 'image'){
//             if(!data[key].startsWith('http')){
//                 data[key] = global.config.host = data[key]
//             }
//         }
//     }

//     if(isArray(this.exclude)){
//         this.exclude.forEach(value => {
//             unset(data, value)
//         })
//     }

//     return data
// }

// 将json字符串转化成js对象:反序列化
var jsonToObj = JSON.parse('{ "name":"runoob", "alexa":10000 }');
console.log(jsonToObj)