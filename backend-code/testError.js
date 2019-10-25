// const Koa = require('koa')

// const app = new Koa()


// app.use(async(ctx, next)=>{
//     try{
//         await next()
//     }catch(e){
//         console.log('e..', e.message);
//         ctx.body += '..error....................' + e.message
//     }
// })
// app.use(async(ctx, next)=>{
//     console.log('a..1');
//     ctx.body = 'a'
//     await next()
//     console.log('a..2');
// })
// app.use(async(ctx, next)=>{
//     console.log('b..1');
//     ctx.body += 'b'
//     // throw new Error('this is a error..')
//     a
//     await next()
//     console.log('b..2');
// })
// app.use(async(ctx, next)=>{
//     console.log('c..1');
//     ctx.body += 'c'
// })

// app.listen(3000)


// 函数异常的设计处理
// 1. 判断异常 return false/null
// 2. 判断异常 throw new Error=>如果每个函数的调用都去try catch就会很麻烦，因此引出全局异常处理(缺陷是try...catch只能处理同步异常,无法处理异步的问题)
// 3. 全局异常处理
// 在所有函数的调用前(顶部),设计一种机制,可以监听所有的异常
// 4. 如何处理异步的异常处理(最开始使用回调函数，现在可以用async/await)(总结：函数返回的时Promise时，可以使用async/await处理异常和异步处理)
// 5. await的实质是对表达式的请求, await后面必需是返回的Promise对象。
function func1() {
    // 第二种
    // try {
    //     func2() 
    // } catch (error) {
    //     throw error
    // }
    try {
        func2() 
    } catch (error) {
        throw error
    }
   
}
// 异步异常处理加async/await
async function func2() {
    // func3()
    // 第一种
    // const r = func3()
    // if(!r) {

    // }
    // 第二种
    // try {
    //     func3()
    // } catch (error) {
    //     console.log(error)  // 因为fun3异步,func2不能捕捉到该异常
    // }
    // 异步异常处理
    try {
        await func3()
    } catch (error) {
        console.log(error)  
    }
}

// async function func3() {
//     // 第一种
//     // return false
//     // 第二种
//     // throw new Error()
//     // try {
//     //     // 1/0
//     //     0/a
//     // } catch (error) {
//     //     throw error
//     // }
//     // 由于js的设计问题这里单独执行func3会得到字符串success,因为在js中1/0不是非法的，得到1/0->Infinity,0/0 NaN。
//     // return 'success'

//     // 异步的情况
//     // setTimeout(()=>{
//     //     throw new Error('error') // 这里会直接抛出异常，fun2中并不能console出fun3中的异常。func3执行时直接就抛出了异常
//     // },1000)
//     // 异步异常 这样是没用的，需要返回的是异步操作的Promise包装
//     // await setTimeout(()=>{
//     //     throw new Error('error') 
//     // },1000)
// }

// 异步异常的正确处理方式
// 自己封装函数返回Promise
function func3() {
    // Promise解析
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            const r = Math.random()
            if(r<0.5){
                reject('error')
            }
        },1000)
    })
}
// func3()

func1()
