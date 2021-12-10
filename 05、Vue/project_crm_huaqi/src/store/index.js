/*
 * @Author: your name
 * @Date: 2021-06-30 10:35:46
 * @LastEditTime: 2021-07-12 09:22:58
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        settings,
        user
    },
    getters,
    plugins: [createPersistedState({ // 插件配置信息
        key: 'store', // key对象存储的key值可以自定义
        storage: window.localStorage, // storage对象存储的value值，采用HTML5中的新特性localStorage属性实现
    })]
})

export default store