// components/listview/listview.js
const app = getApp()
const computedBehavior = require('miniprogram-computed')
Component({
  behaviors: [computedBehavior],
  properties: {
    
  },

  data: {
    itemPropList: [],
    pageSize: 12,
    currentPage: 1,
  },

  lifetimes: {
    created: function() {
      this._getItemPropList()
    }
  },
  
  methods: {
    onPageChanged: function (e) {
      // console.log(e.detail)
      if (e.detail && e.detail !== this.data.currentPage) {
        this.setData({
          currentPage: e.detail
        })
      }
    },
    _getItemPropList: async function () {
      const db = wx.cloud.database()
      const MAX_LIMIT = 20
      const countResult = await db.collection(app.globalData.database_id).count()
      const total = countResult.total
      const batchTimes = Math.ceil(total / MAX_LIMIT)
      const tasks = []
      for (let i = 0; i < batchTimes; i++) {
        const promise = db.collection(app.globalData.database_id)
                        .skip(i * MAX_LIMIT)
                        .limit(MAX_LIMIT)
                        .get()
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
        itemPropList: result.data,
      })
    },
  },
  computed: {
    startIdx(data) {
      return (data.currentPage-1) * data.pageSize
    },
    endIdx(data) {
      return data.startIdx + data.pageSize
    },
    showList(data) {
      return data.itemPropList.slice(data.startIdx, data.endIdx)
    },
    totalPage(data) {
      return Math.ceil(data.itemPropList.length / data.pageSize)
    }
  }
})
