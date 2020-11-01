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
                <input type="date" v-model="meetingDate" class="form-control" id="meetingDate" name="meetingDate">
            </div>
            <div class="input_section">
                <label>
                Start Time (hh:mm)
                </label>
                <input id="start-time-hours" v-model="startTimeHours" type="number" value="0" min="0" max="23">
                <input id="start-time-minutes" v-model="startTimeMinutes" type="number" value="0" min="0" max="59">
            </div>
            <div class="input_section">
                <label>
                End Time (hh:mm)
                </label>
                <input id="end-time-hours" v-model="endTimeHours" type="number" value="0" min="0" max="23">
                <input id="end-time-minutes" v-model="endTimeMinutes" type="number" value="0" min="0" max="59">
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
</style>