<template>
  <div id="app">
    <Navbar
      :isAuth="isAuth"
      :trigger="trigger"
      v-on:user-logout="userLoggedOut"
    />
    <div class="container my-4">
      <router-view v-on:user-logged="userLoggedIn" v-on:profile-updated="profileUpdated"></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  },
  data(){
    return{
      isAuth:false,
      trigger:true
    }
  },
  mounted(){
    console.log('haha');
    console.log(localStorage.getItem('token'));
  },
  methods: {
    userLoggedIn(){
      console.log('Login ho gya');
      this.isAuth = true;
    },
    userLoggedOut(){
      console.log('Logout ho gya');
      this.isAuth = false;
    },
    profileUpdated(){
      console.log('profile update')
      this.trigger = !this.trigger;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
