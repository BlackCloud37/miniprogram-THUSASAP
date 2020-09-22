// components/pagination/pagination.js
const computedBehavior = require('miniprogram-computed')
Component({
  behaviors: [computedBehavior],
  properties: {
    pageSize: Number,
    totalPage: Number,
  },

  data: {
    currentPage: 1,
  },

  computed: {
    pageArray(data) {
      const PAGE_ARRAY_SIZE = 5
      const currentPage = data.currentPage
      const totalPage = data.totalPage
      const startPage = Math.floor( (currentPage-1) / PAGE_ARRAY_SIZE) * PAGE_ARRAY_SIZE + 1
      const endPage = startPage + PAGE_ARRAY_SIZE - 1 > totalPage ? totalPage : startPage + PAGE_ARRAY_SIZE - 1
      let arr = []
      for (let i = startPage; i <= endPage; i++) {
        arr.push(i)
      }
      // console.log(arr)
      return arr
    }
  },

  methods: {
    shiftPage: function(event) {
      if (event.target.dataset.idx >= 1 && event.target.dataset.idx <= this.data.totalPage) {
        this.setData({
          currentPage: event.target.dataset.idx
        })
        // console.log(this.data.currentPage)
        this.triggerEvent('change-page', this.data.currentPage)      
      }
    }
  }
})
