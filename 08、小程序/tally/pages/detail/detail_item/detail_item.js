// pages/detail/detail_item/detail_item.js
import deviceUtil from "../../../miniprogram_npm/lin-ui/utils/device-util"
import {deleteBillInfoById} from '../../../service/home.js'
Page({
  /**
   * 获取 CapsuleBar 高度
   */
  getNavigationBarHeight() {
    const capsuleBarHeight = deviceUtil.getNavigationBarHeight()
    console.log(`CapsuleBar 的高度为${capsuleBarHeight}rpx`)
  },
 
  /**
   * 页面的初始数据
   */
  data: {
    dataItem:null,
    url:`/pages/tally/tally/tally?id=`,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({dataItem}) {
    const opt = JSON.parse(dataItem)
    this.setData({
      dataItem:opt
    })
  },
  clickListAction(){
    let dataItem = this.data.url + JSON.stringify(this.data.dataItem.id)
    wx.navigateTo({
      url: dataItem,
    })
  },
  /**
   * 删除一条记录逻辑
   */
  clickDeleteAction(){
    wx.showModal({
      title: '提示',
      content: '确定删除这条记账?',
      success: async ({confirm})=>{
        if(confirm){
          const res = await deleteBillInfoById(this.data.dataItem.id);
          if(res.data.code === 0){
            console.log('删除成功',res);
            wx.switchTab({
              url: '/pages/detail/detail',
            })
          }else{
            console.log('删除失败');
          }
        }
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})