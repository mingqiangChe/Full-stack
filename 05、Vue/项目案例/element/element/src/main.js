
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import http from 'axios'
Vue.prototype.$http = http
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// 优化速度  按需引入  需要使用直接引入对应组件即可
import { Button,Option,Tag, DatePicker, Form, FormItem, Select, Container, Aside, Dialog, Header, Submenu, Main, Menu, MenuItem, MenuItemGroup, Dropdown, DropdownItem, DropdownMenu, Card, Col, Row, TableColumn, Table, Breadcrumb, BreadcrumbItem, Input } from 'element-ui';

Vue.config.productionTip = false
// Vue.use(ElementUI);
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.use(Container)
Vue.use(Tag)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(Menu)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Card)
Vue.use(Col)
Vue.use(Row)
Vue.use(Table)
Vue.use(Dialog)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(Input)

Vue.use(BreadcrumbItem)
if (process.env.NODE_ENV === 'development') require('@/api/mock')
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
