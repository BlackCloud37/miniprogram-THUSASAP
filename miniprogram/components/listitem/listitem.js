// components/listitem/listitem.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemProp: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    img_root_url: app.globalData.img_server_root_url,
    avatar_url: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
