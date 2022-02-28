import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// pdf打印
import htmlToPdf from '@/components/utils/htmlToPdf'
Vue.use(htmlToPdf)
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  components: {},
  render: h => h(App)
}).$mount('#app')
