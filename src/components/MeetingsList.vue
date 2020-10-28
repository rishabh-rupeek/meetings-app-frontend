<template>
    <div id="meetingsList">
        <b-list-group>
            <b-list-group-item
                v-for="(meeting,index) in meetings" 
                :key="index"
                >
                {{meeting.name}}
                </b-list-group-item>
            </b-list-group>
    </div>
</template>
<script>
export default {
    props:{
        meetings:Array
    }
}
</script>
<style scoped>
.meetingsList{
    margin: 2em;
}
</style>