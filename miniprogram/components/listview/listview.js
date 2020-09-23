// components/listview/listview.js
const app = getApp()
const computedBehavior = require('miniprogram-computed')
const db = wx.cloud.database()

Component({
  behaviors: [computedBehavior],
  properties: {
    filterOptions: Object
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
      this.getCurrentTotalPage()
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
    getCurrentTotalPage: async function(option={}) {
      const countResult = await db.collection(app.globalData.database_id).where(option).count()
      const total = countResult.total
      this.setData({
        totalPage: Math.ceil(total / this.data.pageSize)
      })
    },
    getCurrentPage: async function(option={}) {
      this.setData({
        finished: false
      })
      db.collection(app.globalData.database_id)
        .where(option)
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
  watch: {
    'filterOptions': function(filterOptions) {
      console.log(filterOptions)
      let option = {}
      const _ = db.command
      if (filterOptions.searchWord && filterOptions.searchWord.length > 0) {
        const reg = db.RegExp({
          regexp: filterOptions.searchWord,
          option: 'i'
        })
        option = _.or([
          {
            name: reg
          },
          {
            nickname: reg
          },
          {
            appearance: reg
          },
          {
            color: reg
          },
          {
            place: reg
          }
        ])
      }
      console.log(option)
      this.getCurrentTotalPage(option)
      this.getCurrentPage(option)
    }
  },
  computed: {
    startIdx(data) {
      return (data.currentPage-1) * data.pageSize
    },
  }
})
