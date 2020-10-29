<template>
    <div id="meetingsList">
        <b-list-group class="container-fluid text-left">
            <b-list-group-item
                v-for="(meeting,index) in meetings" 
                :key="index"
                >
                <b>{{formatDate(meeting.date)}}</b>
                {{formatTime(meeting.startTime.hours)}}:{{formatTime(meeting.startTime.minutes)}} - {{formatTime(meeting.endTime.hours)}}:{{formatTime(meeting.endTime.minutes)}}
                <br>
                {{meeting.name}}
                <br>
                <b-button variant="danger">Excuse Yourself</b-button>
                <hr>
                <AddUser
                    :eventId = "meeting._id"
                    :users = "meeting.attendees"
                    :allUsers = "allUsers"
                />
                </b-list-group-item>
            </b-list-group>
    </div>
</template>
<script>
import AddUser from './AddUser'
import { getUsers } from '../services.js/users'

export default {
    components:{
        AddUser
    },
    props:{
        meetings:Array
    },
    data(){
        return{
            users:[],
            allUsers:[]
        }
    },
    methods:{
        formatDate(date){
            return date.substr(0,10);
        },
        formatTime(time){
            if(time > 9){
                return time;
            }else return '0'+ time;
        }
    },
    mounted(){
        getUsers().then((response)=>{
            //console.log(response.data);
            response.data.forEach(user => {
                this.allUsers.push(user.email);
            });
        }).catch((err)=>{
            console.log(err);
        })
    }
}
</script>
<style scoped>
.meetingsList{
    margin: 2em;
}
</style>