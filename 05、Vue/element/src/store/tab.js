/*
 * @Author: your name
 * @Date: 2021-12-12 13:07:34
 * @LastEditTime: 2021-12-13 13:37:45
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /Full-stack/05、Vue/element/src/store/tab.js
 */
export default {
  state: {
    // 伸缩
    isCollapse: false,
    // 面包屑数据
    currentMenu:null,
    tabsList:[
      {
        path:'/',
        name:'home',
        label:'首页',
        icon:'home'
      }
    ]
  },
  mutations: {
    // 取反控制
    collapseMenu (state) {
      state.isCollapse = !state.isCollapse
    },
    // 面包屑
    selectMenu (state, val) {
      // val.name === 'home' ? (state.currentMenu = null) : state.currentMenu = val

      if (val.name == 'home') {
        state.currentMenu = null
      } else {
        state.currentMenu = val
        // 新增tabsList
        let result = state.tabsList.findIndex(item => item.name == val.name)
        result === -1 ? state.tabsList.push(val) : ''
      }
    },
    closeTag (state, val) {
      let result = state.tabsList.findIndex(item => item.name === val.name)
      state.tabsList.splice(result, 1)
    }
  }
}
