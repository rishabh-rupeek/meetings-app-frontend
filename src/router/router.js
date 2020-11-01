import Vue from 'vue';
import Router from 'vue-router';
import { isAuthenticated } from '../services.js/utils'

Vue.use( Router );

const router = new Router({
    mode: 'history',
    routes: [
        {
            name: 'login',
            path: "/",
            component: () => import( '@/components/Login' )
        },
        {
            name: 'calendar',
            path: "/calendar",
            component: () => import( '@/components/Calendar' )
        },
        {
            name: 'meetings',
            path: "/meetings",
            component: () => import( '@/components/Meetings' )
        },
        {
            name: 'teams',
            path: "/teams",
            component: () => import( '@/components/Teams' )
        },
        {
            name: 'profile',
            path: "/profile",
            component: () => import( '@/components/Profile' )
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.name !== 'login' && !isAuthenticated()) next({ name: 'login' })
    else next()
  })

export default router;