import {createRouter, createWebHistory} from "vue-router";
import {Database} from "../data/Database";

const routes = [
    {
        path: '/',
        name: 'home',
        meta: {
            layout: 'PageLayout',
            requiresAuth: true
        },
        component: () => import("../views/Home.vue")
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            layout: 'LoginLayout',
            requiresAuth: false
        },
        component: () => import("../views/Login.vue")
    },
    {
        path: '/registration',
        name: 'registration',
        meta: {
            layout: 'LoginLayout',
            requiresAuth: false
        },
        component: () => import("../views/Registration.vue")
    },
    {
        path: '/categories',
        name: 'categories',
        meta: {
            layout: 'PageLayout',
            requiresAuth: true
        },
        component: () => import("../views/Categories.vue")
    },
    {
        path: '/detail',
        name: 'detail',
        meta: {
            layout: 'PageLayout',
            requiresAuth: true
        },
        component: () => import("../views/DetailRecord.vue")
    },
    {
        path: '/history',
        name: 'history',
        meta: {
            layout: 'PageLayout',
            requiresAuth: true
        },
        component: () => import("../views/History.vue")
    },
    {
        path: '/planning',
        name: 'planning',
        meta: {
            layout: 'PageLayout',
            requiresAuth: true
        },
        component: () => import("../views/Planning.vue")
    },
    {
        path: '/profile',
        name: 'profile',
        meta: {
            layout: 'PageLayout',
            requiresAuth: true
        },
        component: () => import("../views/Profile.vue")
    },
    {
        path: '/record',
        name: 'record',
        meta: {
            layout: 'PageLayout',
            requiresAuth: true
        },
        component: () => import("../views/Record.vue")
    },
    {
        path: '/settings',
        name: 'settings',
        meta: {
            layout: 'PageLayout',
            requiresAuth: true
        },
        component: () => import("../views/Settings.vue")
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, from, next) => {
    const status = await Database.getStatusSession()
    if (to.meta.requiresAuth && status === 'close')
        next('/login')
    else next()
})

export default router