<template>
    <div>
        Calendar
        {{name}}
        <input type="date" v-on:input="getMeetings" id="datePicker">
    </div>
</template>
<script>
export default {
    
}
</script>
<script>
import { getMeetingsForUser } from '../services.js/calendar'
export default {
    data(){
        return{
            name:localStorage.getItem('name'),
            email:localStorage.getItem('email'),
            userId:localStorage.getItem('userId'),
            token: localStorage.getItem('token'),
            meetingsList: []
        }
    },
    mounted(){
        document.getElementById('datePicker').valueAsDate = new Date();

    },
    methods:{
        getMeetings(){
            const selectedDate = document.getElementById('datePicker').value;
            console.log(selectedDate);
            getMeetingsForUser(selectedDate)
                .then((response) => {
                    console.log(response);
                }).catch((error) => {
                    console.log(error);
                })
        }
    }
}
</script>