// components/listview/listview.js
const app = getApp()
const computedBehavior = require('miniprogram-computed')
const db = wx.cloud.database()

Component({
  behaviors: [computedBehavior],
  properties: {
    
  },

  data: {
    showList: [],
    totalPage: 0,
    pageSize: 10,
    currentPage: 1,
    finished: false,
  },

  lifetimes: {
    created: async function() {
      const countResult = await db.collection(app.globalData.database_id).count()
      const total = countResult.total
      this.setData({
        totalPage: Math.ceil(total / this.data.pageSize)
      })
      this.getCurrentPage()
    }
  },
  
  methods: {
    onPageChanged: function (e) {
      if (e.detail && e.detail !== this.data.currentPage) {
        this.setData({
          currentPage: e.detail
        })
        this.getCurrentPage()
      }
    },

    getCurrentPage: async function() {
      this.setData({
        finished: false
      })
      db.collection(app.globalData.database_id)
        .skip(this.data.startIdx)
        .limit(this.data.pageSize)
        .get()
        .then((res) => {
          this.setData({
            showList: res.data,
            finished: true
          })

        })
    }
  },
  computed: {
    startIdx(data) {
      return (data.currentPage-1) * data.pageSize
    },
  }
})
