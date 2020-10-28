<template>
    <div>
        Meetings
    </div>
</template>
<script>
export default {
    
}
</script>
<script>
export default {
    data(){
        return{
            name:localStorage.getItem('name'),
            email:localStorage.getItem('email'),
            userId:localStorage.getItem('userId'),
            token: localStorage.getItem('token')
        }
    }
}
</script>