// components/episode/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index:{
      // type:Number,
      type:String,
      // 检测index变化并进行处理
      observer:function(newVal, oldVal, changedPath){
        let val = newVal < 10?'0'+newVal:newVal
        // 这样操作是不行的，这里小程序内部index为Number回把08转化成数字0，所以更改类型不行
        // 更改了属性String会导致导致内存泄漏
        // this.setData({
        //   index:val
        // })
        // 新增一个_index变量
        this.setData({
          _index:val
        })
        // 总结：不要在observe函数中修改自身的属性
      }
    }
  },
  // wxs

  /**
   * 组件的初始数据
   */
  data: {
    months: [
      '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月',
      '十二月'
    ],
    year: 0,
    month: '',
    _index:''
  },

  attached:function(){
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()

    this.setData({
      year,
      month:this.data.months[month]
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
