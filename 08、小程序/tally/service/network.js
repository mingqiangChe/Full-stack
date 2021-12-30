import {
  baseURL
} from './config.js'

export default function(options) {
  const strUserInfo = wx.getStorageSync('cacheInfo');
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + options.url,
      method: options.method || 'get',
      header:{
        "authorization":strUserInfo
      },
      data: Object.assign(options.data || {},{m:Date.now()}) || {m:Date.now()},
      success: resolve,
      fail: reject
    })
  })
}