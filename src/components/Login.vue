<template>
    <div>
    <form
        @submit="submitForm"
    >
        Login Form
        <div class="form-group">
            <label for="email">Email adress</label>
            <input v-model="email" type="email" class="form-control" id="email" placeholder="Enter email">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input v-model="password" type="password" class="form-control" id="password" placeholder="Password">
        </div>
        <input type="submit" value="submit" class="btn btn-primary">
    </form>
    </div>
</template>
<script>
import { loginWithCredentials } from '../services.js/auth'
export default {
    name : 'Login',
    data() {
        return {
            email : null,
            password : null
        }
    },
    methods:{
        submitForm : function(e) {
            e.preventDefault();
            loginWithCredentials(this.email,this.password)
                .then((response)=>{
                    console.log(response);
                    localStorage.setItem('token',response.data.token);
                    localStorage.setItem('name',response.data.name);
                    localStorage.setItem('email',response.data.email);
                    localStorage.setItem('userId',response.data.userId);
                    localStorage.setItem('profileImage',response.data.email+'jpg')
                    this.$router.push(this.$route.query.redirect || '/calendar');
                }).catch((error)=>{
                    console.log(error);
                })
        }
    }    
}
</script>
<style scoped>

</style>