<template>
    <nav v-if="this.isAuth" class="navbar navbar-expand navbar-dark bg-dark">
        <ul class="nav navbar-nav">
            <li class="nav-item">
                <router-link class="nav-link" to="/calendar" exact>Calendar</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/meetings" exact>Meetings</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/teams" exact>Teams</router-link>
            </li>
        </ul>
        <ProfileIcon class="profileIcon" v-on:user-logout="userLoggedOut" :testProp = "trigger"/>
        <b-icon v-b-modal.modal-center @click="getNotfications" icon="bell-fill" font-scale="3" class="rounded-circle border-danger p-3" variant="light"></b-icon>
        <b-modal id="modal-center" centered title="Recent Notifications">
            <p 
            v-for="(notification,index) in notifications"
            :key="index"
            >
            {{notification.message}}
            </p>
        </b-modal>
    </nav>
</template>

<script>
import ProfileIcon from './ProfileIcon'
import { isAuthenticated } from '../services.js/utils'
import { getNotificationsForUser } from '../services.js/notifications'

export default {
    name: 'Navbar',
    components:{
        ProfileIcon
    },
    data(){
        return{
            notifications:[]
        }
    },
    props:{
        isAuth:Boolean,
        trigger:Boolean
    },
    methods:{
        userLoggedOut(){
            this.$emit('user-logout');
        },
        getNotfications(){
            getNotificationsForUser()
                .then((response) => {
                    this.notifications = response.data;
                }).catch((err) => {
                    console.log(err);
                })
        }
    },
    mounted(){
        if(isAuthenticated()){
            this.isAuth = true;
            this.$emit('logged-in');
        }
    }
}
</script>

<style scoped>
.nav{
    top:0;
    width: 100%;
}
</style>