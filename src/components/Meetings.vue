<template>
    <div>
        Meetings
        <div>
        <b-tabs content-class="mt-3">
            <b-tab title="Filter/Search Meetings" active>
                
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

            </b-tab>
            <b-tab title="Add a Meeting">
                <p>I'm the second tab</p>
            </b-tab>
        </b-tabs>
        </div>
        <MeetingsList 
            :meetings="meetingsList"
            class="meetingsList"
        />
    </div>
</template>
<script>
import MeetingsList from './MeetingsList'
import { searchMeetingsForUser } from '../services.js/meetings'
export default {
    name: 'Meetings',
    components:{
        MeetingsList
    },
    data(){
        return{
            name:localStorage.getItem('name'),
            email:localStorage.getItem('email'),
            userId:localStorage.getItem('userId'),
            token: localStorage.getItem('token'),
            dateOption: "TODAY",
            searchText: "",
            meetingsList: []
        }
    },
    methods:{
        search(){
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