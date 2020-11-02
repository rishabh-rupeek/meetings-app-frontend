<template>
    <div>
        <div>
            <div class="input_section">
                <label>
                Meeting Name:
                </label>
                <input class="form-control" type="text" v-model="name">
            </div>
            <div class="input_section">
                <label for="meetingDate">Date:</label>
                <b-form-datepicker :min="min" v-model="meetingDate" id="meetingDate" name="meetingDate"></b-form-datepicker>
            </div>
            <div class="input_section">
                <label>
                Start Time (hh:mm)
                </label>
                <input id="start-time-hours" class="time" v-model="startTimeHours" type="number" value="0" min="0" max="23">
                <input id="start-time-minutes" class="time" v-model="startTimeMinutes" type="number" value="0" min="0" max="59">
            </div>
            <div class="input_section">
                <label>
                End Time (hh:mm)  
                </label>
                <input id="end-time-hours" class="time" v-model="endTimeHours" type="number" value="0" min="0" max="23">
                <input id="end-time-minutes" class="time" v-model="endTimeMinutes" type="number" value="0" min="0" max="59">
            </div>
            <div class="input_section">
                <label>
                Description:
                </label>
                <b-form-textarea
                id="textarea"
                class="form-control"
                v-model="desc"
                placeholder="What is the agenda for the meeting?"
                rows="3"
                max-rows="6"
            ></b-form-textarea>    
            </div>
            <div class="input_section">
                <label>
                Email id's of the Attendees Or Team's short names:
                </label>
                <input type="text"
                id="textarea"
                v-model="attendees"
                class="form-control"
                placeholder="john@example.com,@tech-team"
                size="100"
                >    
            </div>
            <button @click="add" class="btn btn-primary">Add Meeting</button>
        </div>
    </div>
</template>
<script>
import { addMeeting } from '../services.js/meetings'
import { sendNotification } from '../services.js/utils'
import { addNotification } from '../services.js/notifications'
import { getMembersOfTeam } from '../services.js/teams'

export default {
    name:'AddMeeting',
    data(){
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()) 
        const minDate = new Date(today)
        return{
            name:"",
            meetingDate: "",
            startTimeHours : 0,
            startTimeMinutes: 0,
            endTimeHours : 0,
            endTimeMinutes: 0,
            desc:"",
            attendees:"",
            min:minDate
        }
    },
    beforeMounted(){
        
    },
    methods:{
        async add(){
            const body = {
                name:this.name,
                description:this.desc,
                date:this.meetingDate,
                startTime:{
                    hours:parseInt(this.startTimeHours),
                    minutes:parseInt(this.startTimeMinutes)
                },
                endTime:{
                    hours:parseInt(this.endTimeHours),
                    minutes:parseInt(this.endTimeMinutes)
                },
                attendees: this.attendees.split(',')
            }
            
            const promisesToAwait = [];

            for( let i=0; i<body.attendees.length; i++ ){
                if(body.attendees[i][0] === '@'){
                    promisesToAwait.push(getMembersOfTeam(body.attendees[i].substr(1)));
                }
            }
            const teamMembers = [];
            const teams = await Promise.all(promisesToAwait);
            teams.forEach((team) => {
                if(team !== undefined){
                    teamMembers.push(...team.data);
                }
            })

            body.attendees.push(localStorage.getItem('email'));
            body.attendees.push(...teamMembers);
            body.attendees = body.attendees.filter(attendee => attendee[0]!=='@');
            body.attendees = [... new Set(body.attendees)];
            
            addMeeting(body)
                .then((response) => {
                    console.log(response);
                    const notification = {
                        email:localStorage.getItem('email'),
                        date:new Date(),
                        message:`You created ${body.name} meeting`
                    }
                    addNotification(notification)
                        .then(() => {
                            sendNotification(`Meeting scheduled on ${response.data.date.substr(0,10)}`,"success");
                        }).catch((error) => {
                            console.log(error);
                        })  
                }).catch((error) => {
                    console.log(error);
                })
        }
    }
}
</script>
<style scoped>
.input_section{
    margin-bottom: 20px;
}
.time{
    margin-left: 10px;
    margin-right: 10px;
}
</style>