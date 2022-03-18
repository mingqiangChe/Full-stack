import copy from './copy'
import longpress from './longpress'
import debounce from './debounce'
import emoji from './emoji'
import LazyLoad from './LazyLoad'
emoji
// 自定义指令
const directives = {
  copy,
  longpress,
  debounce,
  emoji,
  LazyLoad
}
 
export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key])
    })
  },
}

