import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/views/Home'], resolve)
const Eat = resolve => require(['@/views/Eat'], resolve)
const Stat = resolve => require(['@/views/Stat'], resolve)
const Detail = resolve => require(['@/views/Detail'], resolve)
const About = resolve => require(['@/views/About'], resolve)
const Error404 = resolve => require(['@/views/error/Error404'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/eat',
        component: Eat
    },
    {
        path: '/stat',
        component: Stat
    },
    {
        path: '/detail',
        component: Detail
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '*',
        component: Error404
    }
]

let router = new Router({
    mode: 'history',
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
})

export default router
