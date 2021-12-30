//app.js
import { getOpenId, checkHasUser } from './service/home.js'
import { promisic } from './miniprogram_npm/lin-ui/utils/util.js'
import { checkUpdateVersion } from './utils/updateVersion.js'
const flag = true;
let strUserInfo;
App({
  onLaunch: function () {
    // 版本自动更新代码
    checkUpdateVersion();
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    strUserInfo = wx.getStorageSync('cacheInfo') || null

    // 获取用户信息
    wx.getSetting({
      success: async res => {
        if (res.authSetting['scope.userInfo']) {
          if (strUserInfo) {
            //缓存有用户信息了 判断库中是否有这个缓存的openid 有就直接登录
            console.log('缓存进入-----------');
            await this.getWxLogin();
          } else {
            console.log('授权进入-----------');

            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: async res => {
                // 可以将 res 发送给后台解码出 unionId
                console.log('走了这里。。。');
                this.globalData.userInfo = res.userInfo

                await this.getWxLogin();
              }
            })
          }
        }
      }
    })
    console.log('app.js');
  },
  // 没有缓存的user 拿openid在库里查找有该人直接登录
  userInfoReadyCallback(res) {
    //判断如果库里有这个openid 我才能通过，不然就得去登录
    console.log('userInfoReadyCallback');
    if (res.code === 0) {
      this.globalData.show = false;
      this.globalData = res.data
      // wx.setStorageSync('cacheInfo',res.data) 
      //成功匹配
      return;
    } else {
      //没有只能跳转去登录
      wx.reLaunch({
        url: '/pages/login/login',
      })
    }

  },
  async getWxLogin() {
    //缓存进入的,特殊处理  缓存不走登录判断 优点 快 缺点 不安全 优化方式 -- 走一次查库  ---暂时不考虑走缓存
    if (strUserInfo) {
      console.log('走缓存');
      try {
        const state = await this._checkHasUser()
        if (state === 0) return;
      } catch (error) {
        console.log(error);
      }
    }
    // 登录 缓存走登录判断   优点 安全 缺点，慢
    promisic(wx.login)().then(async res => {
      if (res.code) {
        const result = await getOpenId(res.code + '')
        // 判断缓存里面的openid 是接口返回的openid 说明 有权限
        console.log('进来之前', res, result);
        console.log(strUserInfo, 'strUserInfo   缓存内容');
        this.globalData.token = result.data.data || '' //只要token有值，说明拿到了数据库的值 就可以不用登录直接获取用户信息
        wx.setStorageSync('cacheInfo', this.globalData.token)
        if (this.globalData.token) {
          this.globalData.show = false
        }
        //==>>  获取用户信息之后再登录然后从这里做登录后的事情
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (this.userInfoReadyCallback && typeof this.userInfoReadyCallback === 'function') {
          this.userInfoReadyCallback(result.data)
        }
      }
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
    })
  },
  async _checkHasUser() {
    const result = await checkHasUser();
    console.log(result, '..');
    if (result.data.code === 0) {
      this.globalData.token = strUserInfo
      this.globalData.show = false
      return 0;
    } else {
      return -1;
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '获取你的昵称、头像', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  log(...arg) {
    if (typeof flag == 'boolean' && flag) {
      console.log(JSON.stringify(...[arg]))
    }
    else {
      return;
    }
  },
  globalData: {
    userInfo: null,
    token: '',
    show: true //当前loading的状态
  }

})