import home from './pages/home'
import about from './pages/about'
import article from './pages/article'
import archive from './pages/archive'
import apply from './pages/apply'
import test from './pages/test'
import VueRouter from 'vue-router'
const routes = [
{
	path:'/',
    redirect:'/home',
},
{
    path:'/index',
    component:()=>import(/* webpackChunkName: "index" */
    '@/pages/index'),
    children:[
        {
            path:'/home',
            name:'home',
            component:home
        },
        {
            path:'/about',
            name:'about',
            component:about
        },
        {
            path:'/archive',
            name:'archive',
            component:archive
        },
        {
            path:'/tag/:name',
            name:'tag',
            component:archive
        },
        {
            path:'/article',
            name:'article',
            component:article
        },
        {
            path:'/apply',
            name:'apply',
            component:apply
        },{
            path:'/test',
            name:'test',
            component:test
        }
    ]
},
{
    path: '/login',
    name: 'login',
    redirect: '/login/index',
    component: () => import ( /* webpackChunkName: "page" */
    '@/pages/login/index'),
    children: [
        {
            path: 'index',
            name: 'login-index',
            meta: {
                keepAlive: true,
                isTab: false,
                isAuth: false
            },
            component: () => import ( /* webpackChunkName: "page" */
                    '@/pages/login/login')
        }, {
            path: 'register',
            name: 'register',
            meta: {
                keepAlive: true,
                isTab: false,
                isAuth: false
            },
            component: () => import ( /* webpackChunkName: "pages" */
                    '@/pages/login/register')
        }, {
            path: 'password',
            name: 'password',
            meta: {
                keepAlive: true,
                isTab: false,
                isAuth: false
            },
            component: () => import ( /* webpackChunkName: "pages" */
                    '@/pages/login/password')
        }
    ],
},
{
    path:'*',
    redirect:'/'
}
]
const router =new VueRouter({
	routes,
	mode: 'history'
})
export default router;
