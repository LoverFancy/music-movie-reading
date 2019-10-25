import {
    HTTP
} from '../util/http.js'

class LikeModel extends HTTP {
    like(behavior, artID, category){
        let url = behavior == 'like' ? 'like' : 'cancel'
        this.request({
            url: url,
            method: 'POST',
            data: {
                art_id: artID,
                type: Number(category)
            }
        })
    }

  getClassicLikeStatus(artID, category, sCallback){
        this.request({
            url:'classic/' + category + '/' + artID + '/favor',
            success:sCallback
        })
        // return this.request({
        //   url: 'classic/' + category + '/' + artID + '/favor'
        // })
    }

}

export {
    LikeModel
}