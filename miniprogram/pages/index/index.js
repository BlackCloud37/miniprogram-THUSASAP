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

    ]
  },

  onLoad: function() {
    
  },
  tabChange(e) {
    console.log('tab change', e)
  }
})
