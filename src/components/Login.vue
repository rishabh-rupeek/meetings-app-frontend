<template>
    <div>
        <b-tabs content-class="mt-3">
            <b-tab title="Login" active>
                <form
                    @submit="submitForm"
                >
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
            </b-tab>
            <b-tab title="Register">
                <form
                    @submit="registerUser"
                >
                    <b-form-group
                        id="fieldset-horizontal"
                        label-cols-sm="4"
                        label-cols-lg="3"
                        label="Enter your name:"
                        label-for="input-horizontal"
                    >
                    <b-form-input 
                        v-model="register_name" 
                        type="text"
                        id="email input-horizontal"
                    >
                    </b-form-input>
                    </b-form-group>
                    <b-form-group
                        id="fieldset-horizontal"
                        label-cols-sm="4"
                        label-cols-lg="3"
                        label="Enter your email:"
                        label-for="input-horizontal"
                    >
                    <b-form-input 
                        v-model="register_email" 
                        type="email"
                        id="email input-horizontal"
                    >
                    </b-form-input>
                    </b-form-group>
                    <b-form-group
                        id="fieldset-horizontal"
                        label-cols-sm="4"
                        label-cols-lg="3"
                        label="Enter your Password:"
                        label-for="input-horizontal"
                    >
                    <b-form-input 
                        v-model="register_password" 
                        type="password"
                        id="password input-horizontal"
                    >
                    </b-form-input>
                    </b-form-group>
                    <input type="submit" value="submit" class="btn btn-primary">
                </form>
            </b-tab>
        </b-tabs>
    </div>
</template>
<script>
import { loginWithCredentials } from '../services.js/auth'
import { registerWithCredentials } from '../services.js/auth'
import { sendNotification } from '../services.js/utils';
import { getProfilePicture } from '../services.js/utils';
import { getDefaultPicture } from '../services.js/utils';
export default {
    name : 'Login',
    data() {
        return {
            email : null,
            password : null,
            register_name: null,
            register_email: null,
            register_password:null,
            defaultPicture:null
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
                            console.log(response);
                            if(response === undefined){
                                response = this.defaultPicture;
                            }
                            console.log(response);
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
        },
        registerUser : function(e) {
            e.preventDefault();
            const body = {
                name:this.register_name,
                email:this.register_email,
                password:this.register_password
            }
            console.log(body);
            registerWithCredentials(body)
                .then((response) => {
                    console.log(response);
                    localStorage.setItem('token',response.data.token);
                    localStorage.setItem('name',response.data.name);
                    localStorage.setItem('email',response.data.email);
                    localStorage.setItem('userId',response.data.userId);
                    localStorage.setItem("imgData", this.defaultPicture);
                    this.$emit('user-logged');
                    this.$router.push(this.$route.query.redirect || '/calendar');
    
                }).catch((error) => {
                    console.log(error);
                    sendNotification("Error registering user!", "error");
                })
        }
    },
    mounted(){
        getDefaultPicture()
            .then((response) => {
                this.defaultPicture = response;
                //console.log('fetched default' + this.defaultPicture);
            }).catch((err)=>{
                console.log(err);
            })
    }    
}
</script>
<style scoped>

</style>