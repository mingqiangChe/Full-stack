/**
 * 全站权限配置
 *
 */
import router from './routers'
import store from '@/store'
import {validatenull} from '@/utils/validate'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({showSpinner: false})

router.beforeEach((to, from, next) => {
    NProgress.start()
    const meta = to.meta || {}
    if (store.getters.access_token) {
       if (to.path === '/login') {
            next({path: '/'})
        } else {
            const value = to.query.src || to.fullPath
            const label = to.query.name || to.name
            // 针对外链跳转
            if (value.includes('http') || value.includes('https')) {
                window.open(value, '_blank')
                return
            }
            next()
        }
    } else {
        if (meta.isAuth === true) {
            next('/login');
        } else {
            next();
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})
