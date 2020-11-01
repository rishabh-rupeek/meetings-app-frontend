<template>
    <form v-on:submit.prevent="uploadData" enctype="multipart/form-data">
        <b-form-group
            class="fieldset-horizontal"
            label-cols-sm="4"
            label-cols-lg="3"
            description="Let us know your name."
            label="Enter your name"
            label-for="input-horizontal"
        >
        <b-form-input 
            v-model="name" 
            class="input-horizontal"
        >
        </b-form-input>
        </b-form-group>
        <b-form-group
            class="fieldset-horizontal"
            label-cols-sm="4"
            label-cols-lg="3"
            label="Choose new Profile picture"
            label-for="input-horizontal"
        >
        <b-form-file v-on:change="onFileChange" 
            drop-placeholder="Drop file here..." 
            id="image"  
            name="image" />
        </b-form-group> 
        <b-form-group
            class="fieldset-horizontal"
            label-cols-sm="4"
            label-cols-lg="3"
            description="Old Password"
            label="Enter your old password"
            label-for="input-horizontal"
        >
        <b-form-input 
            v-model="oldPassword" 
            type="password"
            class="input-horizontal"
        >
        </b-form-input>
        </b-form-group>

        <b-form-group
            class="fieldset-horizontal"
            label-cols-sm="4"
            label-cols-lg="3"
            description="New Password"
            label="Enter your new password"
            label-for="input-horizontal"
        >
        <b-form-input 
            v-model="newPassword" 
            type="password"
            class="input-horizontal"
        >
        </b-form-input>
        </b-form-group>

        <input type="submit" name="btn_upload_profile_pic" value="Update Profile" /> 
</form>
</template>
<script>
import { upload } from '../services.js/upload'

export default {
    name:'Profile',
    data(){
        return{
            name:localStorage.getItem('name'),
            image:null,
            oldPassword:"",
            newPassword:"",
        }
    },
    methods:{
        onFileChange(e){
            var files = e.target.files || e.dataTransfer.files;
            console.log(files);
            this.image = files[0];
            if (!files.length)
            return;
        },
        uploadData(){
            const formData = new FormData();
            formData.append('image', this.image);
            formData.append('name', this.name);
            formData.append('oldPassword',this.oldPassword);
            formData.append('newPassword',this.newPassword);
    
            upload(formData)
                .then(() => {
                    this.$emit('profile-updated');
                }).catch((err) => {
                    console.log(err);
                })
        }
    }
}
</script>
<style>

</style>