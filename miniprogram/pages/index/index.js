//index.js
const app = getApp()

Page({
  data: {
    selectType: 'all',
    itemPropList: [],
    tabBarList: [
      {
        "text": "图鉴",
        "iconPath": "../../../images/book.svg",
        "selectedIconPath": "../../../images/book.svg",
      },
    ],
    filterOptions: {}
  },

  onLoad: function() {
    
  },

  tabChange(e) {
    console.log('tab change', e)
  },

  onFilterOptionsChanged: function(e) {
    this.setData({
      filterOptions: e.detail
    })
    // console.log(this.data.filterOptions)
  }
})
