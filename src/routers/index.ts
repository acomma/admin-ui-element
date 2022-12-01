import { createRouter, createWebHashHistory } from 'vue-router'
import { useLoginUserStore } from '../stores/login-user'

const routes = [
    {
        path: '/login',
        component: () => import('../layouts/LoginLayout.vue'),
    },
    {
        path: '/',
        component: () => import('../layouts/BasicLayout.vue'),
        children: [
            {
                path: '/user',
                component: () => import('../views/user.vue'),
            },
            {
                path: '/role',
                component: () => import('../views/role.vue'),
            },
            {
                path: '/menu',
                component: () => import('../views/menu.vue'),
            },
            {
                path: '/menu/action',
                component: () => import('../views/menu-action.vue'),
            },
        ],
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next()
    } else {
        const loginUserStore = useLoginUserStore()
        const token = loginUserStore.getToken
        if (token) {
            next()
        } else {
            next({ path: '/login' })
        }
    }
})

export default router