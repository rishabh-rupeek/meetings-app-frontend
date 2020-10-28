import Vue from 'vue';
import Router from 'vue-router';

Vue.use( Router );

export default new Router({
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
        }
    ]
});