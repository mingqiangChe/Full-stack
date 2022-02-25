/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-11-24 21:47:41
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-12-08 11:37:11
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/myself',
    name: 'myself',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/MySelf.vue')
  },
  {
    path: '/case',
    name: 'case',
    component: () => import(/* webpackChunkName: "about" */ '../views/Case.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import(/* webpackChunkName: "about" */ '../views/Contact.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
