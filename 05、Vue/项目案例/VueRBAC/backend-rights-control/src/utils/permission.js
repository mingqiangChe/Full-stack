import Vue from 'vue'
import router from '@/router.js'
Vue.directive('permission', {
    inserted(el, binding) {
        const action = binding.value.action
        const effect = binding.value.effect
        //判断，当前路由所对应的组件中，如何判断是否具备action权限
        console.log(router.currentRoute);
        if (router.currentRoute.meta.indexOf(action) == -1) {
            if (effect === 'disabled') {
                el.disabled = true
                el.classList.add('is-disabled')
            } else {
                el.parentNode.removeChild(el)
            }

        }
    }
})