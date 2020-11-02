<template>
    <div>
        <div class="float-right d-block">
        <input type="date" v-model="selectedDate" v-on:input="getMeetings" id="datePicker">
        </div>
        <br>
        <MeetingsList 
            class="meetings"
            :meetings="meetings"
        />
    </div>
</template>

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
                    this.meetings.sort(function(a,b){
                        return new Date(a.date) - new Date(b.date);
                    });
                }).catch((error) => {
                    console.log(error);
                })
        }
    }
}
</script>
<style scoped>
#datePicker{
    margin: 1rem;
}
</style>
<style>
</style>