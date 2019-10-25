import {
    HTTP
}
from '../util/http.js'

class ClassicModel extends HTTP {
    // sCallback是接收请求结果并处理的回调函数
    getLatest(sCallback) {
      // 延时是为了保证token先被获取
      setTimeout(() => {
        // 调用HTTP类的方法
        this.request({
          url: 'classic/latest',
          success: (res) => {
            // console.log(res)
            sCallback(res)
            // 存储latest的index
            this._setLatestIndex(res.index)
            let key = this._getKey(res.index)
            // 存储当前的期刊信息
            wx.setStorageSync(key, res)
          }
        })
      },1000)
        
    }
    // getLatest(){
    //   return this.request({
    //     url: 'classic/latest'
    //   })
    // }
    getClassic(index, nextOrPrevious, sCallback) {
        // 缓存中寻找 or API 写入到缓存中
        // key 确定key
        let key = nextOrPrevious == 'next' ?
            this._getKey(index + 1) : this._getKey(index - 1)
        // 获取期刊的缓存
        let classic = wx.getStorageSync(key)
        if (!classic) {
            this.request({
                url: `classic/${index}/${nextOrPrevious}`,
                success: (res) => {
                    // 添加期刊缓存
                    wx.setStorageSync(this._getKey(res.index), res)
                    sCallback(res)
                }
            })
        } else {
            sCallback(classic)
        }

        // this.request({
        //     url:'classic/' + index + `/${nextOrPrevious}`,
        //     success: (res) => {
        //         sCallback(res)
        //     }
        // })

    }

    // 判断是否是第一期
    isFirst(index) {
        return index == 1 ? true : false
    }
    // 判断期刊是否是最新
    isLatest(index) {
        let latestIndex = this._getLatestIndex()
        return latestIndex == index ? true : false
    }
    getMyFavor(success) {
        const params = {
            url: 'classic/favor',
            success: success
        }
        this.request(params)
      // return this.request({
      //   url: 'classic/favor',
      // })
    }

    getById(cid, type, success) {
        let params = {
            url: `classic/${type}/${cid}`,
            success: success
        }
        this.request(params)
        // return this.request({
        //   url: `classic/${type}/${cid}`
        // })
    }
    // 存储latest的index
    _setLatestIndex(index) {
        wx.setStorageSync('latest', index)
    }
    // 获取latest的index
    _getLatestIndex() {
        const index = wx.getStorageSync('latest')
        return index
    }

    _getKey(index) {
        const key = 'classic-' + index
        return key
    }
}


export {
    ClassicModel
}