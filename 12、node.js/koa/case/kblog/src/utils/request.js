import axios from "axios"
import { serialize } from './utils.js'
import { baseUrl } from '@/utils/env.js';
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' 
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/routers'
axios.defaults.baseURL = baseUrl;
axios.defaults.timeout = 10000;

//返回其他状态吗
axios.defaults.withCredentials=true;
// axios.defaults.validateStatus = function (status) {
//     return status >= 200 && status <= 500; // 默认的
//   };
//HTTPrequest拦截
axios.interceptors.request.use(config => {  
    NProgress.start() // start progress bar
    const meta = (config.meta || {});
    const isToken = meta.isToken === false;
    if (store.getters.access_token && !isToken) {
      config.headers['token'] = store.getters.access_token // 让每个请求携
    }
    //headers中配置serialize为true开启序列化
    if (config.method === 'post' && meta.isSerialize === true) {
      config.data = serialize(config.data);
    }
    return config
  }, error => {
    return Promise.reject(error)
  });

  //HTTPresponse拦截
axios.interceptors.response.use(res => {
    NProgress.done();
    const status = res.data.errCode
    // const statusWhiteList = website.statusWhiteList || [];
    const message = res.data.msg || res.data.message ||'未知错误';
    //如果在白名单里则自行catch逻辑处理
    // if (statusWhiteList.includes(status)) return Promise.reject(res);
    //如果是401则跳转到登录页面
    if (status === 2002) store.dispatch('FedLogOut').then(() => router.push({ path: '/login' }));
    if (status !== 0) {
      Message({
        message: message,
        type: 'error'
      })
      return Promise.reject(new Error(message))
    }
    return res;
  }, error => {
    // NProgress.done();
    return Promise.reject(new Error(error));
  })
export default axios;