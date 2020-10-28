<template>
    <div>
        Hey {{name}}
        <div class="float-right">
        <input type="date" v-model="selectedDate" v-on:input="getMeetings" id="datePicker">
        </div>
        <MeetingsList 
            :meetings="meetings"
        />
    </div>
</template>
<script>
export default {
    
}
</script>
<script>
import { getMeetingsForUser } from '../services.js/calendar'
import MeetingsList from './MeetingsList'
export default {
    name: 'Calendar',
    components:{
        MeetingsList
    },
    data(){
        return{
            name:localStorage.getItem('name'),
            email:localStorage.getItem('email'),
            userId:localStorage.getItem('userId'),
            token: localStorage.getItem('token'),
            selectedDate: (new Date()).toISOString().substr(0,10),
            meetings: []
        }
    },
    mounted(){
        this.getMeetings();
    },
    methods:{
        getMeetings(){
            getMeetingsForUser(this.selectedDate)
                .then((response) => {
                    //console.log(response);
                    this.meetings = response.data;
                }).catch((error) => {
                    console.log(error);
                })
        }
    }
}
</script>
<style scoped>

</style>
<style>
</style>