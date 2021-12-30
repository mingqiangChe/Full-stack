// pages/tally/tally.js
const {getCategoryData,putBillInfoById,getBillInfoById} = require('../../../service/home.js')
const {formatTime} = require('../../../utils/util.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // list:require('../../../config/table_bar_config.js').default,
    grids:[],
    gridActive: 0,//选中的分类内容id
    tabActive:2,//分类的id
    remark:'',//备注
    resultNum:0, //计算器计算的结果
    icon:'', //图标
    tabBarHeight:0,
    tabContentHeight:400,
    pageHeight:0,
    createTime:formatTime(new Date()),
    show:false, //显示计算器
    id:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({id}) {
    const opt = JSON.parse(id)
    this.setData({
      id:opt
    })
    this._getCategoryData()
    this._getBillInfoById()
  },
  //tab事件
  changeTabs(e){
    this.setData({
      tabActive:Number(e.detail.activeKey),
      show:false,
      gridActive:0,
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
      tag:this.data.remark,
      money:this.data.resultNum}
      this._putBillInfoById(this.data.id,data);
  },
  //备注信息状态
  chageRemark(e){
    this.setData({
      remark:e.detail.value
    })
  },
  //获取分类数据
  async _getCategoryData(){
    const res = await getCategoryData();
    const windowHeight = wx.getSystemInfoSync().windowHeight;
    const topbar = wx.getSystemInfoSync().safeArea.top;
    const statusBarHeight = wx.getSystemInfoSync().statusBarHeight
    console.log(windowHeight,topbar,statusBarHeight);
    if(res.data.code === 0){
      this.setData({
        grids:res.data.data,
        pageHeight: windowHeight - topbar - statusBarHeight - 420
      })
    }
  },
  //获取一个数据
  async _getBillInfoById(){
    const res = await getBillInfoById(this.data.id);
    if(res.data.code === 0){
      console.log(res.data.data);
      const {bill_category_icon,bill_category_name,bill_delivery_method,bill_money,bill_tag,create_time} = res.data.data
      this.setData({
        gridActive: bill_delivery_method || 2, //选中的分类内容id
        tabActive: bill_category_name || 1,//分类的id
        remark: bill_tag || '',//备注
        resultNum: bill_money || 0, //计算器计算的结果
        icon: bill_category_icon || 'soud', //icon
        createTime:create_time ||formatTime(new Date())
      })
    }
  },
  //更新一个数据
  async _putBillInfoById(id,{
    deliveryMethod,
    categoryName,
    categoryIcon,
    tag,
    money,}){
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
    const data = {
      deliveryMethod,
      categoryName,
      categoryIcon,
      tag,
      money,}
    const res = await putBillInfoById(id,data)
    if(res.data.code === 0){
      console.log('更新成功,跳转。。。');
      wx.switchTab({
        url: '/pages/detail/detail',
      })
    }else{
      console.log('失败了。。。');
    }
  },
  showState(e){
    if(e&& e.detail && e.detail.show){
      this.setData({
        show:e.detail.show
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.showState();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      show:false,
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