import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/',
        name: 'home',
        meta: {
            layout: 'PageLayout'
        },
        component: () => import("../views/Home.vue")
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            layout: 'LoginLayout'
        },
        component: () => import("../views/Login.vue")
    },
    {
        path: '/registration',
        name: 'registration',
        meta: {
            layout: 'LoginLayout'
        },
        component: () => import("../views/Registration.vue")
    },
    {
        path: '/categories',
        name: 'categories',
        meta: {
            layout: 'PageLayout'
        },
        component: () => import("../views/Categories.vue")
    },
    {
        path: '/detail',
        name: 'detail',
        meta: {
            layout: 'PageLayout'
        },
        component: () => import("../views/DetailRecord.vue")
    },
    {
        path: '/history',
        name: 'history',
        meta: {
            layout: 'PageLayout'
        },
        component: () => import("../views/History.vue")
    },
    {
        path: '/planning',
        name: 'planning',
        meta: {
            layout: 'PageLayout'
        },
        component: () => import("../views/Planning.vue")
    },
    {
        path: '/planning',
        name: 'planning',
        meta: {
            layout: 'PageLayout'
        },
        component: () => import("../views/Planning.vue")
    },
    {
        path: '/planning',
        name: 'planning',
        meta: {
            layout: 'PageLayout'
        },
        component: () => import("../views/Planning.vue")
    },
    {
        path: '/profile',
        name: 'profile',
        meta: {
            layout: 'PageLayout'
        },
        component: () => import("../views/Profile.vue")
    },
    {
        path: '/record',
        name: 'record',
        meta: {
            layout: 'PageLayout'
        },
        component: () => import("../views/Record.vue")
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router