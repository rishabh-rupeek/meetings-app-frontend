<template>
    <div>
        <b>Attendees: </b>
        <span
            v-for="(user,user_index) in usersPresent"
            :key="user_index"
        >
        {{user}}
        </span>
        <br>
        <select name="selectUser" :id="eventId">
            <option 
            v-for="(user,user_index) in remainingUsers"
            :key="user_index" 
            :value="user"
            >
            {{user}}
            </option>
        </select>
        <b-button @click="addUser" variant="primary">Add</b-button>
    </div>
</template>
<script>
import { addUserToMeeting } from '../services.js/meetings'

export default {
    name:'AddUser',
    props:{
        users:Array,
        allUsers:Array,
        eventId:String
    },
    data(){
        return{
            usersPresent:[],
            remainingUsers:[]
        }
    },
    beforeMount(){
        console.log(this.eventId);
        //console.log(this.users);
        this.users.forEach(user => {
            this.usersPresent.push(user.email);
        })
        
        this.remainingUsers = this.allUsers.filter(x => !this.usersPresent.includes(x));
        //console.log(this.remainingUsers);
    },
    mounted(){
        
    },
    methods:{
        addUser(){
            console.log(this.eventId);
            console.log(document.getElementById(this.eventId).value);
            
            const email = document.getElementById(this.eventId).value;
            const meetingId = this.eventId;
            
            addUserToMeeting(email,meetingId)
                .then((response) => {
                    console.log(response);
                    const attendees = response.data.attendees;
                    this.usersPresent = [];
                    attendees.forEach(user => {
                        this.usersPresent.push(user.email);
                    })
                    this.remainingUsers = this.allUsers.filter(x => !this.usersPresent.includes(x));
                }).catch((error) => {
                    console.log(error);
                })
        }
    }
}
</script>