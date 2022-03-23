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
        name: "blog",
        // 组件懒加载
        component: () => import("@/views/Blog/Blog"),
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
      {
        path: "/home",
        name: "home",
        // 组件懒加载
        component: () => import("@/views/Home/Home"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
