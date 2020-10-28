<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
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
    </nav>
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

<style scoped>
.nav{
    top:0;
}
</style>