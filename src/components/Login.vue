<template>
    <div>
    <form
        @submit="submitForm"
    >
        Login Form
        <b-form-group
            id="fieldset-horizontal"
            label-cols-sm="4"
            label-cols-lg="3"
            label="Enter your email"
            label-for="input-horizontal"
        >
        <b-form-input 
            v-model="email" 
            type="email"
            id="email input-horizontal"
        >
        </b-form-input>
        </b-form-group>
        <b-form-group
            id="fieldset-horizontal"
            label-cols-sm="4"
            label-cols-lg="3"
            label="Enter your Password"
            label-for="input-horizontal"
        >
        <b-form-input 
            v-model="password" 
            type="password"
            id="password input-horizontal"
        >
        </b-form-input>
        </b-form-group>
        <input type="submit" value="submit" class="btn btn-primary">
    </form>
    </div>
</template>
<script>
import { loginWithCredentials } from '../services.js/auth'
import { sendNotification } from '../services.js/utils';
import { getProfilePicture } from '../services.js/utils';
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
                    getProfilePicture(response.data.email)
                        .then((response) => {
                            localStorage.setItem("imgData", response);
                            this.$emit('user-logged');
                            this.$router.push(this.$route.query.redirect || '/calendar');
                            //console.log(response + 'Fetched Image');
                        }).catch((err) => {
                            console.log(err);
                        })
                    
                    //localStorage.setItem('profileImage',response.data.email+'jpg')
                }).catch((error)=>{
                    console.log(error);
                    sendNotification("Incorrect Username or Password", "error");
                })
        }
    }    
}
</script>
<style scoped>

</style>