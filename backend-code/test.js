console.log(1/0);

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function test(){
    await sleep(1000)
    console.log('ab');
}

test()


var obj = {
    name: "ab",
    pwd: '123',
    // toJSON(){
    //     return 'ab'
    // }
    toJSON: function(){
        return 'ab'
    }
}

console.log(JSON.stringify(obj));
