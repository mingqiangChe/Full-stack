//index.js
//获取应用实例
const app = getApp()
const { setLoginFlag } = require('../../service/home.js')
Page({
  data: {
    userInfo: app.globalData.userInfo || {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },
  onLoad() {
    this.setData({
      canIUseGetUserProfile: true,
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: async (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        //获取到了微信信息 存入全局
        wx.setStorageSync('cacheInfo',wx.getStorageSync('cacheInfo'))
        const data = {
          username:res.userInfo.nickName, 
          sex:res.userInfo.gender, 
          avatar:res.userInfo.avatarUrl
        }
        //存入数据库
        try {
          const result = await setLoginFlag(data);
          console.log(result,'------------');
          if(result.data.code === 0){
            wx.reLaunch({
              url: '/pages/detail/detail',
            })
          }else{
            wx.showToast({
              icon:'error',
              title: result.data.msg,
            })
          }
        } catch (error) {
          throw new Error(error)
        }
        
        
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
})