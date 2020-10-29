<template>
    <div class="text-left container">
        Teams
        <TeamsList
            class="row"
            :teams="teams"
        />
        <AddTeam/>
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
    }
}
</script>