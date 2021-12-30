/*
 * @Author: your name
 * @Date: 2021-12-10 16:17:58
 * @LastEditTime: 2021-12-13 17:27:43
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /Full-stack/05、Vue/element/src/store/index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    tab
  }
})
