/*
 * @Author: your name
 * @Date: 2021-12-10 16:17:58
 * @LastEditTime: 2021-12-13 13:25:43
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /Full-stack/05、Vue/element/src/router/index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
// 解决面包屑点击首页报错
const originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // name: 'Main',
    component: Main,
    children: [
      {
        path: '/',
        name: 'home',
        // 组件懒加载
        component: () => import('@/views/Home/Home')
      }, {
        path: '/mall',
        name: 'mall',
        // 组件懒加载
        component: () => import('@/views/Mall/Mall')
      }, {
        path: '/user',
        name: 'user',
        // 组件懒加载
        component: () => import('@/views/User/User')
      }
    ]
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
