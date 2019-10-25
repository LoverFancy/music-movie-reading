const Koa = require('koa');
// 实例化对象
const app = new Koa();
// 中间件实质就是个函数
// function test() {
//     console.log('test');
// }
// 通过koa的use方法进行注册函数就变成了中间件
// app.use(test); // 当前端访问当前的ip+端口时,koa就会执行use方法调用的中间件函数
// 匿名函数方式
// app.use(()=>{
//     console.log('test1')
// })
// 多个中间件注册,只会执行第一个中间件
// app.use(()=>{
//     console.log('test2')
// })
// app.use(()=>{
//     console.log('test3')
// })
// 如何执行多个中间件(ctx为上下文,next为下一个中间件函数)
// app.use((ctx,next)=>{
//     console.log(ctx,next)
//     console.log('test4');
//     // 调用下一个中间件
//     next();
// })
// app.use((ctx,next)=>{
//     console.log(ctx,next)
//     console.log('test5');
//     // 调用下一个中间件,最后一个就不需要调用next函数
//     // next();
// })

// 洋葱模型  下面两个use输出 1,3,4,2

// app.use((ctx,next)=>{
//     console.log(1)
//     next()
//     console.log(2)
// })
// app.use((ctx,next)=>{
//     console.log(3)
//     next()
//     console.log(4)
// })

// async和await结合使用，在中间件函数需要使用异步的async和await，才能保证所有的中间件都能按照洋葱模型的规则执行
// 目的就是保证异步函数的正确执行
// 标准写法（要明白其中的原理就必须要理解promise/async/await知识点）
// 5，7，8，6
// app.use(async (ctx,next)=>{
//     console.log(5)
//     await next()
//     console.log(6)
// })
// app.use(async (ctx,next)=>{
//     console.log(7)
//     await next()
//     console.log(8)
// })

// 中间件的调用总是返回一个Promise对象,即next()函数返回的是一个包装后的Promise对象。
// 返回的结果为下一个中间件的返回结果，无返回值则是undefined包装的Promise对象
// 5,7,8,Promise,6,abc
// app.use((ctx,next)=>{
//     console.log(5)
//     const a = next() 
//     // 获取Promise的返回内容
//     a.then((res)=>{
//         console.log(res); // abc在最后执行时异步的结果。Promise后的then方法是异步的，因此是在主线程执行完后再执行异步任务。
// 这里then后面的内容和await的内容哪个先执行是在node 8 和 node 10中有所不同，正确应该是then先执行，await后执行
//     })
//     // console.log(a) // Promise { undefined }  Promise { 'abc' }
//     console.log(6)
// })
// app.use((ctx,next)=>{
//     console.log(7)
//     console.log(8)
//     return "abc"
// })

// 换成async和await写法可以直接获取到Promise中的异步返回值，无需使用then去获取返回结果
// 5,7,8,abc,6
// app.use(async (ctx,next)=>{
//     console.log(5)
//     const a = await next()
//     // next()本身返回的是Promise函数,加了await代表对包装后的Promise的求值,返回成功的Promise结果
//     // await不仅能对Promise求值，其他表达式也可以
//     // await会阻塞当前的线程，即当后面调用的是异步的函数时就能体现其作用,这反而起到了同步的写法实现了异步的调用。
//     console.log(a)
//     console.log(6)
// })
// app.use((ctx,next)=>{
//     console.log(7)
//     console.log(8)
//     return "abc"
// })

// await 阻塞当前线程,等待异步调用的结果返回: 线程会等待await后面的函数结果返回之后再继续执行
// async 会将函数的返回值包装成Promise对象。
// app.use(async (ctx,next)=>{
//     const axios = require('axios')
//     const start = Date.now()
//     const res = await axios.get('http://7yue.pro') // 模拟异步请求
//     // console.log(res)
//     const end = Date.now()
//     console.log(end-start)  // 没有async和await时结果为1很小,有了await就会阻断线程一直等待结果返回
// })

// 5,7,6,8=>没有按照洋葱模型执行代码,因为第二个中间件内异步请求前的await阻断了线程，js会退出该执行栈，执行外层的任务
// 两个都不加async,await就是普通的同步任务结果 5,7,8,6
// 所以为了保证所有中间件函数按照洋葱模型执行异步任务，必需在中间件函数前加await，在next()函数前加await  5,7,等待结果后执行,8,6
// app.use(async (ctx,next)=>{
//     console.log(5)
//     await next()
//     console.log(6)
// })
// app.use(async (ctx,next)=>{
//     console.log(7)
//     const axios = require('axios')
//     const res = await axios.get('http://7yue.pro') // 模拟异步请求
//     // await next()
//     console.log(8)
// })

// ctx参数传递中间件中的异步结果

app.use(async (ctx,next)=>{
    await next()  
    // 获取的内层结果必需在next()后面
    console.log(ctx.res) // 10000
})
app.use(async (ctx,next)=>{   

    const res = await 100*100  
    // 保存返回的异步结果
    ctx.res = res 
    await next()
})

app.listen(3001);