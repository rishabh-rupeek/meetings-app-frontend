<template>
    <form v-on:submit.prevent="uploadData" enctype="multipart/form-data">
    <div> 
       <label>Select your profile picture:</label> <input v-on:change="onFileChange" type="file" id="image"  name="image" />
    </div>
    <div> 
        <input type="submit" name="btn_upload_profile_pic" value="Upload" /> 
    </div>
</form>
</template>
<script>
import axios from 'axios'

export default {
    name:'Profile',
    data(){
        return{
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
            axios.post(`http://localhost:3000/api/upload?email=${localStorage.getItem('email')}`,formData,{
                headers: {
                    'Authorization': localStorage.getItem( 'token' )
                }
                })
                .then((result) => {
                    console.log(result);
                }).catch((err) => {
                    console.log(err);
                })
        }
    }
}
</script>
<style>

</style>