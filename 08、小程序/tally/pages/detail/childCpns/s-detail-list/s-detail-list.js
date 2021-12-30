// pages/detail/childCpns/s-detail-list/s-detail-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    detailDataList:{
      type:Array,
      value:[]
    },
    detailHeadList:{
      type:Array,
      value:[]
    },
    pageUnBodyHeight:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    newHeadList:[],
    url:`/pages/detail/detail_item/detail_item?dataItem=`,
    tabBarHeight:wx.getStorageSync('tabBarHeight') || 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickListAtion(e){
      let dataItem = this.data.url + JSON.stringify(e.target.dataset.list)
      wx.navigateTo({
        url: dataItem,
      })
    },
  }
})
