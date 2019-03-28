import Vue from 'vue'
import Router from 'vue-router'
import Landing from "@/views/Landing";
import Taiga from "@/views/Taiga";
import GitHub from "@/views/GitHub";
import Dashboard from "@/views/Dashboard";

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'landing',
            component: Landing
        },
        {
            path: '/taiga/:slug',
            name: 'taiga',
            component: Taiga
        },
        {
            path: '/github/:slug',
            name: 'github',
            component: GitHub
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard
        }
    ]
})
