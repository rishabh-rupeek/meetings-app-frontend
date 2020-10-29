<template>
    <div>
        <h3>Search for Meetings</h3>
        <div>
            Date
            <select v-model="dateOption" name="date" id="dateOption">
                <option value="TODAY">TODAY</option>
                <option value="ALL">ALL</option>
                <option value="PAST">PAST</option>
                <option value="UPCOMING">UPCOMING</option>
            </select>
        </div>
        <div>
            Search For
            <b-form-textarea
                id="textarea"
                v-model="searchText"
                placeholder="Enter something..."
                rows="3"
                max-rows="6"
            ></b-form-textarea>
        </div>
        <button @click="search">Search</button>
        <MeetingsList 
            v-on:meeting-dropped="search"
            :meetings="meetingsList"
        />
    </div>
</template>
<script>
import MeetingsList from './MeetingsList'
import { searchMeetingsForUser } from '../services.js/meetings'

export default {
    name:'SearchMeetings',
    components:{
        MeetingsList
    },
    data(){
        return{
            dateOption: "TODAY",
            searchText: "",
            meetingsList: []
        }
    },
    methods:{
        search(){
            console.log('searching');
            searchMeetingsForUser(this.dateOption,this.searchText)
                .then((response) => {
                    //console.log(response);
                    this.meetingsList = response.data;
                }).catch((error) => {
                    console.log(error);
                })
        }
    }
}
</script>