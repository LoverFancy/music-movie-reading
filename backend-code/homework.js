// 这里是对原型链的解析
// ES5如何实现class

class A{
    constructor(){
        this.nameA = 'a'
    }
    validateA(){
        console.log('A');
    }
}
class B extends A{
    constructor(){
        super()
        this.nameB = 'b'
    }
    validateB(){
        console.log('B');
    }
}
class C extends B{
    constructor(){
        super()
        this.nameC = 'c'
    }
    validateC(){
        console.log('C');
    }
}


// instance: 实例 fieldPrefix：属性名的前缀 funcPrefix：方法名的前缀
// findMembers返回类里面所有的属性名和方法名(从原型链查找)
function findMembers(instance, fieldPrefix, funcPrefix) {

    // 递归函数
    function _find(instance) {
         //基线条件（跳出递归）
        if (instance.__proto__ === null)
            return []
        // Reflect.ownKeys()返回一个由目标对象自身的属性键组成的数组。
        // Object.keys()返回属性key，但不包括不可枚举的属性
        // Reflect.ownKeys()返回所有属性key
        let names = Reflect.ownKeys(instance)
        // let names = Object.keys(instance)
        names = names.filter((name)=>{
            // 过滤掉不满足条件的属性或方法名
            return _shouldKeep(name)
        })
        return [...names, ..._find(instance.__proto__)]
    }

    function _shouldKeep(value) {
        if (value.startsWith(fieldPrefix) || value.startsWith(funcPrefix))
            return true
    }

    return _find(instance)
}

var c = new C()

const members = findMembers(c, 'name', 'validate')
console.log(members);

// console.log(Object.keys(c));
console.log();
console.log(c, '~~~~~', Reflect.ownKeys(c), '~~~~~', Object.keys(c), c.validateC);
console.log(c.__proto__, '~~~~~', Reflect.ownKeys(c.__proto__), '~~~~~', Object.keys(c.__proto__));
console.log(c.__proto__.__proto__, '~~~~~', Reflect.ownKeys(c.__proto__.__proto__), '~~~~~', Object.keys(c.__proto__.__proto__));

console.log();

console.log(c.__proto__ === C.prototype, C.prototype);
console.log(C.prototype.validateC);
console.log(Reflect.ownKeys(C.prototype));

console.log('---------------');
function findM(instance, fieldPrefix, funcPrefix){
    function _find(instance){
        if(instance.__proto__ === null){
            return []
        }

        let names = Reflect.ownKeys(instance)
        // names = names.filter(name => {
        //     return _shouldKeep(name)
        // })
        
        return [...names, ..._find(instance.__proto__)]
    }

    function _shouldKeep(val){
        if(val.startsWith(fieldPrefix) || val.startsWith(funcPrefix)){
            return true
        }
    }

    return _find(instance)
}
const m = findM(c, 'name', 'validate')
console.log(m);
