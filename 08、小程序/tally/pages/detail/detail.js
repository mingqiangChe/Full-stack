// pages/detail/detail.js
const app = getApp();
let list = require('../../config/table_bar_config.js').default
const { formatMonth } = require('../../utils/util.js')
let {detailDataInfo,detailDataList} =require('../../json/index.js')
const {getDetailDataList} = require('../../service/home.js') //获取明细数据列表
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list: [],
      detailDataInfo:{},
      detailDataList:[],
      detailHeadList:[],
      pageUnBodyHeight:0,
      expend: 0,
      income: 0,
      scrollTop: undefined,
      topScrollTop:0,
      show:true,
      date: formatMonth(new Date()) || '2021-01'

  },
  onPageScroll(res) {
    this.setData({
      scrollTop: res.scrollTop
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(wx.getSystemInfoSync().windowHeight , 77 , wx.getSystemInfoSync().statusBarHeight , wx.getSystemInfoSync().safeArea);
    this.setData({
      list,
      detailDataList,
      detailDataInfo,
      pageUnBodyHeight:wx.getSystemInfoSync().windowHeight - 80 - wx.getSystemInfoSync().statusBarHeight - wx.getSystemInfoSync().safeArea.top / 2
    })
  },
  async _getDetailDataList(){
     
      const result = await getDetailDataList(this.data.date);
      const newHeadList = this._timesReduce(result.data.data.headList,result.data.data.dataList);
      const {
        income,
        expend
      } = this.countIO(newHeadList);
      this.setData({
        show:false,
        detailDataList:result.data.data.dataList,
        detailHeadList:newHeadList,
        income,
        expend
      })
      // wx.createSelectorQuery().select('#tab-bar-detail').boundingClientRect(rect=>{console.log(rect.bottom)}).exec();
    // this.setData
  },
  countIO(newHeadList){
    let income = 0;
    let expend = 0;
    newHeadList.forEach(item=>{
      if(item.income){
        income += item.income
      }
      if(item.expend){
        expend += item.expend
      }
    })
    return {
      income,
      expend
    }
  },
  _timesReduce(headList,dataList){
     return headList.map((headItem) => {
      let total1 = 0;
      let total2 = 0;
      dataList.forEach((item)=>{
            
        if(item.create_time.split(' ')[0] == headItem.dates && item.category_name == '收入'){
          total2 += item.bill_money;
        }else if(item.create_time.split(' ')[0] == headItem.dates && item.category_name == '支出'){
          total1 += item.bill_money;
        }
      })
      return {
        ...headItem,
        expend: total1,
        income: total2
      };
    });
  },
  //日期时间 监听
  bindDateChange(e){
    this.setData({
      date:e.detail.value
    },async ()=>{
      //给日期后刷新数据
      await this._getDetailDataList()
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
    wx.nextTick(()=>{
      const Timer = setInterval(() => {
        if(app.globalData&& app.globalData.show){
          console.log('没关闭');
        }else{
          //关闭了,我用上它
          console.log('关闭了');
          this._getDetailDataList() 
          clearInterval(Timer)
        }
      }, 500);
    })
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