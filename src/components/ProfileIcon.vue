<template>
    <div>
        <b-dropdown id="dropdown-1" text="Hey" class="profileIcon" :no-caret=true>
            <span class="profileIcon" slot="button-content">
                Hey {{ name }}
                <img class="img-fluid p-2" src="" id="profileImage" />
            </span>
            <b-dropdown-item>
                <router-link to="/profile" exact>Edit Profile</router-link>
            </b-dropdown-item>
            <b-dropdown-item @click="logout">Logout</b-dropdown-item>
        </b-dropdown>
    </div>
</template>
<script>
import { getProfilePicture } from '../services.js/utils';

export default {
    name:'ProfileIcon',
    data(){
        return{
            name:localStorage.getItem('name'),
            email:localStorage.getItem('email'),
            imgData:localStorage.getItem('imgData') 
        }
    },
    props:['testProp'],
    mounted(){
        var dataImage = localStorage.getItem('imgData');
        var bannerImg = document.getElementById('profileImage');
        bannerImg.src = "data:image/jpg;base64," + dataImage;
    },
    watch: { 
    testProp: function() {
            console.log('run hua');
            this.setImg()
        }
    },
    methods:{
        setImg(){
            this.name = localStorage.getItem('name');
            getProfilePicture(this.email)
                .then((response) => {
                    console.log(response);
                    localStorage.setItem("imgData", response);
                    var bannerImg = document.getElementById('profileImage');
                    bannerImg.src = "data:image/jpg;base64," + response;
                }).catch((err) => {
                    console.log(err);
            })
        },
        logout(){
            localStorage.removeItem('name');
            localStorage.removeItem('email');
            localStorage.removeItem('userId');
            localStorage.removeItem('token');
            localStorage.removeItem('imgData');
            this.$emit('user-logout');
            this.$router.push('/')
        }
    }
}
</script>
<style scoped>
#profileImage{
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

</style>