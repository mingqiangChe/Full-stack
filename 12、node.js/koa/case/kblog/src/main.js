import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import router from './routers'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import './assets/style.css'
import './permission'
import fHeader from './components/f-header'
import fFooter from './components/f-footer'
import i18n from './i18n/i18n'
import store from '@/store'
import processTreeVue from 'process-tree-vue/dist/processTree.min.js'
Vue.component('processTree',processTreeVue)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.component("f-header",fHeader)
Vue.component("f-footer",fFooter)

//Vue.use(ElementUI, {
//i18n: (key, value) => i18n.t(key, value)
//})


new Vue({
    router,
    store,
	i18n,
	render: h => h(App),
}).$mount('#app')
