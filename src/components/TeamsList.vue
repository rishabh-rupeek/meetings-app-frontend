<template>
    <div id="teamsList">
        <div v-if="this.teams.length == 0">
            No available teams
        </div>
        <b-card class="col-sm-4"
            style="margin:1em"
            v-for="(team,index) in teams" 
            :key="index"
            >
            <b-card-text>
                <b>{{team.name}}</b>
                <br>
                @{{team.shortName}}
                <br>
                {{team.description}}
            </b-card-text>
            <b-button @click="excuseFromTeam(team._id)" variant="danger">Drop from team</b-button>
            <hr>
            <AddUser
                :title = "title"
                :eventId = "team._id"
                :users = "team.members"
                :allUsers = "allUsers"
            />
        </b-card>
    </div>
</template>
<script>
import AddUser from './AddUser'
import { getUsers } from '../services.js/users'
import { dropFromTeam } from '../services.js/teams'
import { sendNotification } from '../services.js/utils'

export default {
    data(){
        return{
            title:"Members",
            allUsers:[]
        }
    },
    components:{
        AddUser
    },
    props:{
        teams:Array
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
    },
    methods:{
        excuseFromTeam(teamId){
            dropFromTeam(teamId)
                .then((response)=>{
                    console.log(response);
                    sendNotification(`Team left`,"default");
                    this.$emit('team-dropped');
                }).catch((err)=>{
                    console.log(err);
                })
        }
    }
}
</script>
<style scoped>

</style>