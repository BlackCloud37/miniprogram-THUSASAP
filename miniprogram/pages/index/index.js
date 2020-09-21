//index.js
const app = getApp()

Page({
  data: {
    selectType: 'all',
    itemPropList: [],
  },
  
  _getItemPropList: async function() {

    const db = wx.cloud.database()
    const MAX_LIMIT = 20

    switch (this.data.selectType) {
      case "all":
        const countResult = await db.collection(app.globalData.database_id).count()
        console.log(countResult)
        const total = countResult.total 
        const batchTimes = Math.ceil(total / MAX_LIMIT)
        const tasks = []
        for (let i = 0; i < batchTimes; i++) {
          const promise = db.collection(app.globalData.database_id).skip(i * MAX_LIMIT).limit(MAX_LIMIT).orderBy('imagenum', 'desc').get()
          tasks.push(promise)
        }
        
        const result = (await Promise.all(tasks)).reduce(
          (acc, cur) => {
            return {
              data: acc.data.concat(cur.data),
              errMsg: acc.errMsg  
            }
        })

        this.setData({
          itemPropList: result.data
        })

        
        break;
      case "adopted":
        break;
    }
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
