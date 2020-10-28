<template>
    <div>
        Add a Meeting
        <div>
            <label for="meetingDate">Date:</label>
            <input type="date" id="meetingDate" name="meetingDate">
            <div>
                Start Time (hh:mm)
                <input id="start-time-hours" type="number" value="0" min="0" max="23">
                <input id="start-time-minutes" type="number" value="0" min="0" max="59">
            </div>
            <div>
                End Time (hh:mm)
                <input id="end-time-hours" type="number" value="0" min="0" max="23">
                <input id="end-time-minutes" type="number" value="0" min="0" max="59">
            </div>
            <div>
                Description
                        
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'AddMeeting'
}
</script>