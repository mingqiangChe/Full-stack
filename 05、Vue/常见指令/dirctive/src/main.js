import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import Directives from './directives'
Vue.use(Directives)
new Vue({
  render: h => h(App),
}).$mount('#app')

