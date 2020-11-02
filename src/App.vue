<template>
  <div id="app">
    <div v-if="!isAuth" id="left-section">
        <h1>
          Meetings App
        </h1>
        <div>
          Manage all your meetings
          in one app.
        </div>
        <br>
        <div class="text-left" style="margin:20px">
          <h4>Features: </h4>
          <ul>
            <li>
              View All meetings
            </li>
            <li>
              Filter meetings 
            </li>
            <li>
              Create meetings
            </li>
            <li>
              Create teams
            </li>
            <li>
              Add teams to meetings
            </li>
          </ul>
        </div>
    </div>
    <Navbar
      :isAuth="isAuth"
      :trigger="trigger"
      v-on:user-logout="userLoggedOut"
      v-on:logged-in="userLoggedIn"
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
    //console.log(localStorage.getItem('token'));
  },
  methods: {
    userLoggedIn(){
      this.isAuth = true;
    },
    userLoggedOut(){
      this.isAuth = false;
    },
    profileUpdated(){
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
#left-section{
    top:0px;
    width: 45%;
    height: 800px;
    /* display: inline; */
    float: left;
}
</style>
