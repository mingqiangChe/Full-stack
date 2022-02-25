/*
 * @Author: thomas373737
 * @Date: 2022-02-25 12:52:32
 * @LastEditors: thomas373737
 * @LastEditTime: 2022-02-25 15:58:31
 * @FilePath: /Full-stack/05、Vue/vue2/todo-vue-admin/src/router/index.js
 * @Description: 
 * 
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved. 
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: {
      title: '登录界面'
    }
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '首页',
      requireAuth: true
    }
  },
  {
    path: '**',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
