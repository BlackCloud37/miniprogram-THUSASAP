// components/searchbar/searchbar.js
const db = wx.cloud.database()
Component({
  properties: {

  },
  data: {
    // showFilterCard: false,
    filterOptions: {},
    value: ''
  },
  methods: {
    onInputChanged: function(e) {
      this.data.filterOptions.searchWord = this.data.value
      this.triggerEvent("filter-options", this.data.filterOptions)
    },
    clear: function(e) {
      this.setData({
        value: ''
      })
      this.data.filterOptions.searchWord = ''
      this.triggerEvent("filter-options", this.data.filterOptions)
    }
    // onTapFilter: function() {
    //   this.setData({
    //     showFilterCard: !this.data.showFilterCard,
    //   })
    // }
  }
})
