<template>
    <div id="teamsList">
        <b-list-group>
            <b-list-group-item
                v-for="(team,index) in teams" 
                :key="index"
                >
                {{team.name}}
                </b-list-group-item>
            </b-list-group>
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