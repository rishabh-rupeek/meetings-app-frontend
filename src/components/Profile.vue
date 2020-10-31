<template>
    <form v-on:submit.prevent="uploadData" enctype="multipart/form-data">
        <b-form-group
            id="fieldset-horizontal"
            label-cols-sm="4"
            label-cols-lg="3"
            description="Let us know your name."
            label="Enter your name"
            label-for="input-horizontal"
        >
        <b-form-input 
            v-model="name" 
            id="input-horizontal"
        >
        </b-form-input>
        </b-form-group>

        <b-form-group
            id="fieldset-horizontal"
            label-cols-sm="4"
            label-cols-lg="3"
            description="Let us know your email."
            label="Enter your email"
            label-for="input-horizontal"
        >
        <b-form-input 
            v-model="email" 
            type="email" 
            id="input-horizontal">
        </b-form-input>
        </b-form-group>

        <b-form-group
            id="fieldset-horizontal"
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
        <div class="mt-3">Selected file: {{ this.image ? this.image.name : '' }}</div>
        <input type="submit" name="btn_upload_profile_pic" value="Update Profile" /> 
</form>
</template>
<script>
import { upload } from '../services.js/upload'
import { sendNotification } from '../services.js/utils'

export default {
    name:'Profile',
    data(){
        return{
            name:localStorage.getItem('name'),
            email:localStorage.getItem('email'),
            image:null
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
            formData.append('email',this.email);
            // console.log(formData.get('name'));
            // console.log(formData.get('email'));
            // console.log(formData.get('image'));
            upload(formData)
                .then(() => {
                    sendNotification("Profile Updated","success");
                }).catch((err) => {
                    console.log(err);
                })
        }
    }
}
</script>
<style>

</style>