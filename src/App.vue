<template>
  <div id="app">
    <Navbar
      :isAuth="isAuth"
      v-on:user-logout="userLoggedOut"
    />
    <div class="container my-4">
      <router-view v-on:user-logged="userLoggedIn"></router-view>
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
      isAuth:false
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
