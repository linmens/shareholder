import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Rugu from './views/rugu/rugu.vue'
import Zhanbi from './views/rugu/zhanbi.vue'
import user from './views/rugu/user.vue'
import Jizhang from './views/caiwu/jizhang.vue'
import Kucun from './views/caiwu/kucun.vue'
let routes = [{
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '股份',
        iconCls: 'ivu-icon ivu-icon-bag', //图标样式class
        children: [
            { path: '/rugu', component: Rugu, name: '入股记录' },
            { path: '/zhanbi', component: Zhanbi, name: '股份占比' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '财务',
        iconCls: 'ivu-icon ivu-icon-android-home',
        children: [
            { path: '/jizhang', component: Jizhang, name: '记账' },
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;