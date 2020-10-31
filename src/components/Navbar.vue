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
        <div class="float-right">
        <ProfileIcon v-on:user-logout="userLoggedOut"/>
        </div>
    </nav>
</template>

<script>
import ProfileIcon from './ProfileIcon'
export default {
    name: 'Navbar',
    components:{
        ProfileIcon
    },
    props:{
        isAuth:Boolean
    },
    methods:{
        userLoggedOut(){
            this.$emit('user-logout');
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