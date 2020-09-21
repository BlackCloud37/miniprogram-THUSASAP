// components/detailinfo/detailinfo.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemId: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    itemProp: null,
    img_root_url: app.globalData.img_server_root_url,
    picSrcNameList: null
  },

  lifetimes: {
    attached: function() {
      console.log("detailinfo attached")
    },

    ready: async function() {
      var that = this
      const db = wx.cloud.database()
      db.collection(app.globalData.database_id).doc(that.data.itemId).get({
        success: function (res) {
          
          let picSrcNameList = Array()
          for(var i = 0; i < res.data.imagenum; i++) {
            picSrcNameList.push((i+1) + '.jpg')
          }
          console.log(picSrcNameList)

          that.setData({
            itemProp: res.data,
            picSrcNameList: picSrcNameList
          })
          console.log(that.data)
        }
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})
