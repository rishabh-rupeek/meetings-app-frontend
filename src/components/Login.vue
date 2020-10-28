<template>
    <div>
    <form
        @submit="checkForm"
        action="localhost:3000/api/auth/login" 
        method="post"
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
export default {
    name : 'Login',
    data() {
        return {
            email : null,
            password : null
        }
    },
    methods:{
        checkForm : function(e) {
            console.log('Form filled'+this.email+this.password);
            // Do API call to backend
            
            e.preventDefault();
        }
    }    
}
</script>
<style scoped>

</style>