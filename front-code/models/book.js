import {
    HTTP
}
from '../util/http-p.js'

class BookModel extends HTTP {
    data = null
    // 获取人们书籍
    getHotList() {
        return this.request({
            url: 'book/hot_list'
        })
    }
    // 搜索书籍
    search(start, q){
        return this.request({
            url:'book/search?summary=1',
            data:{
                q:q,
                start:start
            }
        })
    }
    // 获取我喜欢的图书数量
    getMyBookCount() {
        return this.request({
            url: 'book/favor/count'
        })
    }
    // 获取书籍详情
    getDetail(bid) {
        return this.request({
            url: `book/${bid}/detail`
        })
    }
    // 获取书籍喜欢状态
    getLikeStatus(bid) {
        return this.request({
            url: `book/${bid}/favor`
        })
    }
    // 获取短评
    getComments(bid) {
        return this.request({
            url: `book/${bid}/short_comment`
        })
    }

    // 添加评论
    postComment(bid, comment) {
        return this.request({
            url: 'book/add/short_comment',
            method: 'POST',
            data: {
                book_id: bid,
                content: comment
            }
        })
    }
}

export {
    BookModel
}