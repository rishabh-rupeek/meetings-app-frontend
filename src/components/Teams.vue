<template>
    <div class="text-left container">
        <div>
        <b-tabs content-class="mt-3">
            <b-tab title="View Teams" active>
                <TeamsList
                class="row"
                :teams="teams"
                v-on:team-dropped="getTeams"
                />
            </b-tab>
            <b-tab title="Create a new Team">
                <AddTeam
                v-on:team-added="getTeams"
                />
            </b-tab>
        </b-tabs>
        </div>
    </div>
</template>
<script>
import { getTeamsForUser } from '../services.js/teams'
import TeamsList from './TeamsList'
import AddTeam from './AddTeam'

export default {
    name: 'Teams',
    components:{
        TeamsList,
        AddTeam
    },
    data(){
        return{
            name:localStorage.getItem('name'),
            email:localStorage.getItem('email'),
            userId:localStorage.getItem('userId'),
            token: localStorage.getItem('token'),
            teams:[]
        }
    },
    mounted(){
        getTeamsForUser()
            .then((response) => {
                this.teams = response.data
            }).catch((error) => {
                console.log(error);
            })
    },
    methods:{
        getTeams(){
            console.log('fired');
            getTeamsForUser()
            .then((response) => {
                console.log(response.data);
                this.teams = response.data
            }).catch((error) => {
                console.log(error);
            })
            console.log(this.teams);
        }
    }
}
</script>