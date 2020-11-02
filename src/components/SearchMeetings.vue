<template>
    <div class="form-group">
        <h3>Search for Meetings</h3>
        <div class="input_section">
            <label>
            Date
            </label>
            <select class="form-control" v-model="dateOption" name="date" id="dateOption">
                <option value="TODAY">TODAY</option>
                <option value="ALL">ALL</option>
                <option value="PAST">PAST</option>
                <option value="UPCOMING">UPCOMING</option>
            </select>
        </div>
        <div class="input_section">
            <label>
            Search For
            </label>
            <b-form-textarea
                id="textarea"
                v-model="searchText"
                placeholder="Enter something..."
                rows="3"
                max-rows="6"
                class="form-control"
            ></b-form-textarea>
        </div>
        <button @click="search" class="btn btn-primary">Search</button>
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
                    console.log(response);
                    this.meetingsList = response.data;
                    this.meetingsList.sort(function(a,b){
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
.input_section{
    margin-bottom: 20px;
}
</style>