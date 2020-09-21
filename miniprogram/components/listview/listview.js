// components/listview/listview.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // selectType: {
    //   type: String,
    //   value: "all"
    // }
    itemPropList: Array
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  lifetimes: {
    attached: function() {
      console.log("listitemview attached")
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
