import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
// 解决面包屑点击首页报错
const originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originPush.call(this, location).catch((err) => err);
};
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    // name: 'Main',
    component: Main,
    children: [
      {
        path: "/",
        name: "home",
        // 组件懒加载
        component: () => import("@/views/Home/Home"),
      },
      {
        path: "/mall",
        name: "mall",
        // 组件懒加载
        component: () => import("@/views/Mall/Mall"),
      },
      {
        path: "/user",
        name: "user",
        // 组件懒加载
        component: () => import("@/views/User/User"),
      },
    ],
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
