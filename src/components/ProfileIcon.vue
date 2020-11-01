<template>
    <div>
        <b-dropdown id="dropdown-dropleft" dropleft text="Hey" class="m-md-2">
            <span slot="button-content">
                Hey
                <img class="img-fluid p-2" src="" id="profileImage" />
            </span>
            <b-dropdown-item>
                <router-link class="nav-link" to="/profile" exact>Edit Profile</router-link>
            </b-dropdown-item>
            <b-dropdown-item @click="logout">Logout</b-dropdown-item>
        </b-dropdown>
    </div>
</template>
<script>
export default {
    name:'ProfileIcon',
    data(){
        return{
            isAuth: true,
            name:localStorage.getItem('name'),
            imgData:localStorage.getItem('imgData') 
        }
    },
    mounted(){
        var dataImage = localStorage.getItem('imgData');
        if(dataImage == null){
            this.isAuth = false;
        }else{
            var bannerImg = document.getElementById('profileImage');
            bannerImg.src = "data:image/jpg;base64," + dataImage;
        }
    },
    methods:{
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
    width: 50px;
    height: 30px;
    border-radius: 5%;
}
</style>