<template>
    <div>
        Add a Meeting
        <div>
            <div>
                Meeting Name:
                <input type="text" v-model="name">
            </div>
            <div>
                <label for="meetingDate">Date:</label>
                <input type="date" v-model="meetingDate" id="meetingDate" name="meetingDate">
            </div>
            <div>
                Start Time (hh:mm)
                <input id="start-time-hours" v-model="startTimeHours" type="number" value="0" min="0" max="23">
                <input id="start-time-minutes" v-model="startTimeMinutes" type="number" value="0" min="0" max="59">
            </div>
            <div>
                End Time (hh:mm)
                <input id="end-time-hours" v-model="endTimeHours" type="number" value="0" min="0" max="23">
                <input id="end-time-minutes" v-model="endTimeMinutes" type="number" value="0" min="0" max="59">
            </div>
            <div>
                Description
                <b-form-textarea
                id="textarea"
                v-model="desc"
                placeholder="What is the agenda for the meeting?"
                rows="3"
                max-rows="6"
            ></b-form-textarea>    
            </div>
            <div>
                Email id's of the Attendees Or Team's short names:
                <input type="text"
                id="textarea"
                v-model="attendees"
                placeholder="john@example.com,@tech-team"
                size="100"
                >    
            </div>
            <button @click="add">Add Meeting</button>
        </div>
    </div>
</template>
<script>
import { addMeeting } from '../services.js/meetings'
import { sendNotification } from '../services.js/utils'

export default {
    name:'AddMeeting',
    data(){
        return{
            name:"",
            meetingDate: null,
            startTimeHours : 0,
            startTimeMinutes: 0,
            endTimeHours : 0,
            endTimeMinutes: 0,
            desc:"",
            attendees:""
        }
    },
    methods:{
        add(){
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
            body.attendees.push(localStorage.getItem('email'));
            //console.log(body);
            addMeeting(body)
                .then((response) => {
                    console.log(response);
                    sendNotification(`Meeting scheduled on ${response.data.date.substr(0,10)}`,"success");
                }).catch((error) => {
                    console.log(error);
                })
        }
    }
}
</script>