<template>
    <div id="teamsList">
        <b-card 
            v-for="(team,index) in teams" 
            :key="index"
            >
            <b-card-text>
                {{team.name}}
                <br>
                {{team.shortName}}
                <br>
                {{team.description}}
            </b-card-text>
            <b-button>Drop from team</b-button>
            <hr>
            Members: 
            <span
            v-for="(teamMember,member_index) in team.members"
            :key="member_index"
            >
            {{teamMember.email}}
            </span>
        </b-card>
    </div>
</template>
<script>
export default {

    props:{
        teams:Array
    }
}
</script>
<style scoped>

</style>