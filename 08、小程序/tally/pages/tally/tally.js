// pages/tally/tally.js
const {getCategoryData,submitInfo} = require('../../service/home.js')
const {formatTime} = require('../../utils/util.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:require('../../config/table_bar_config.js').default,
    grids:[],
    gridActive: 0,//选中的分类内容id
    tabActive:2,//分类的id
    remark:'',//备注
    resultNum:0, //计算器计算的结果
    icon:'',
    tabBarHeight:0,
    tabContentHeight:400,
    pageHeight:0,
    createTime:formatTime(new Date()),
    show:false //显示计算器
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getCategoryData()
  },
  //tab事件
  changeTabs(e){
    this.setData({
      tabActive:Number(e.detail.activeKey),
      show:false,
      gridActive:0,
      tabContentHeight:400,
    })
  },
  //获取时间事件
  getTimeClick({detail}){
    this.setData({
      createTime:detail && detail || formatTime(new Date())
    })
  },
  //网格状态
  chageGridItem(e){
    this.setData({
      gridActive:Number(e.detail.key),
      icon:e.target.dataset.icon,
      show:true,
    })
  },
  //获取返回计算器数据的点击状态
  async resultNumClick(e){
    //拿到了计算结果
    this.setData({
      resultNum:e.detail.money
    })
    //判断并提交记账信息
    const data = {
      deliveryMethod:this.data.gridActive,
      categoryName:this.data.tabActive,
      categoryIcon:this.data.icon,
      createTime:this.data.createTime,
      tag:this.data.remark,
      money:this.data.resultNum}
      this._submitInfo(data);
  },
  //备注信息状态
  chageRemark(e){
    this.setData({
      remark:e.detail.value
    })
  },
  tabBarHeight(){
    this.setData({
      tabBarHeight:wx.getStorageSync('tabBarHeight')
    })
  },
  //获取分类数据
  async _getCategoryData(){
    console.log(wx.getSystemInfoSync(),'ww');
    const res = await getCategoryData();
    const windowHeight = wx.getSystemInfoSync().windowHeight;
    const topbar = wx.getSystemInfoSync().safeArea.top;
    const statusBarHeight = wx.getSystemInfoSync().statusBarHeight
    const tabBarHeight = wx.getStorageSync('tabBarHeight');
    console.log(windowHeight,topbar,statusBarHeight,tabBarHeight);
    if(res.data.code === 0){
      this.setData({
        grids:res.data.data,
        pageHeight: windowHeight - topbar - statusBarHeight - tabBarHeight - 420
      })
    }
  },
  //提交一个数据
  async _submitInfo({deliveryMethod,
    categoryName,
    categoryIcon,
    createTime,
    tag,
    money}){
    if(!deliveryMethod){
      wx.showModal({
        title:'提示',
        content: '不能为空',
        showCancel:false
      })
    }
    if(!categoryName){
      wx.showModal({
        title:'提示',
        content: '不能为空',
        showCancel:false
      })
      return;
    }
    if(!categoryIcon){
      wx.showModal({
        title:'提示',
        content: '请选择图标',
        showCancel:false
      })
      return;
    }
    if(money == 0){
      wx.showModal({
        title:'提示',
        content: '请输入金额',
        showCancel:false
      })
      return;
    }
    const data = {deliveryMethod,
      categoryName,
      categoryIcon,
      tag,
      createTime,
      money}
    const res = await submitInfo(data)
    if(res.data.code === 0){
      console.log('提交成功');

      wx.switchTab({
        url: '/pages/detail/detail',
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.tabBarHeight()
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
    this.setData({
      show:false,
      gridActive:0,
      remark:'',//备注
      resultNum:0, //计算器计算的结果
      icon:''
    })
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