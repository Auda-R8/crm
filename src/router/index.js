import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/',
        name: 'home',
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
        path: '/categories',
        name: 'categories',
        meta: {
            layout: 'PageLayout'
        },
        component: () => import("../views/Categories.vue")
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router