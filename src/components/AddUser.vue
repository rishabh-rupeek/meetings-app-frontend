<template>
    <div>
        <b> {{this.title}}: </b>
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
import { addUserToTeam } from '../services.js/teams'
import { sendNotification } from '../services.js/utils'

export default {
    name:'AddUser',
    props:{
        title:String,
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
            
            if(this.title === 'Members'){

                const email = document.getElementById(this.eventId).value;
                const teamId = this.eventId;
                addUserToTeam(email,teamId)
                    .then((response) => {
                        //console.log(response);
                        sendNotification(`${email} added to team!`,"default");
                        const members = response.data.members;
                        this.usersPresent = [];
                        members.forEach(user => {
                            this.usersPresent.push(user.email);
                        })
                        this.remainingUsers = this.allUsers.filter(x => !this.usersPresent.includes(x));
                    }).catch((error) => {
                        console.log(error);
                    })

            }else if(this.title === 'Attendees'){

                const email = document.getElementById(this.eventId).value;
                const meetingId = this.eventId;
                
                addUserToMeeting(email,meetingId)
                    .then((response) => {
                        console.log(response);
                        sendNotification(`${email} added to meeting!`,"default");
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
}
</script>