//index.js
const app = getApp()

Page({
  data: {
    selectType: 'unadopted',
    itemPropList: [],
  },
  
  _getItemPropList: async function() {

    const db = wx.cloud.database()
    const _ = db.command
    var that = this
    db.collection(app.globalData.database_id).where({
      adoptionstatus: _.neq("送养")
    }).get({
      success: function(res) {
        console.log(res.data)
        that.setData({
          itemPropList: res.data
        })
      }
    })
  },

  onChangeCatalog: function() {
    // change select type
    if (this.data.selectType === "all") {
      this.setData({
        selectType: "adopted"
      })
    }
    else {
      this.setData({
        selectType: "all"
      })
    }

    // shoud get itemproplist from database
    this._getItemPropList()
  },

  onLoad: function() {
    this._getItemPropList()

    // if (!wx.cloud) {
    //   wx.redirectTo({
    //     url: '../chooseLib/chooseLib',
    //   })
    //   return
    // }

  },



})
