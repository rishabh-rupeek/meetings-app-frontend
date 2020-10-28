<template>
    <div>
        Meetings
        <div>
        <b-tabs content-class="mt-3">
            <b-tab title="Filter/Search Meetings" active>
                <SearchMeetings/>
            </b-tab>
            <b-tab title="Add a Meeting">
                <AddMeeting/>
            </b-tab>
        </b-tabs>
        </div>
    </div>
</template>
<script>
import SearchMeetings from './SearchMeetings'
import AddMeeting from './AddMeeting'

export default {
    name: 'Meetings',
    components:{
        SearchMeetings,
        AddMeeting
    },
    data(){
        return{
            name:localStorage.getItem('name'),
            email:localStorage.getItem('email'),
            userId:localStorage.getItem('userId'),
            token: localStorage.getItem('token'),
        }
    },
    methods:{
        
    }
}
</script>