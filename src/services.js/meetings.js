import axios from 'axios';

export const searchMeetingsForUser = (dateOption,searchItem) => {
    return axios.get(`http://localhost:3000/api/meetings?dateOption=${dateOption}&searchItem=${searchItem}`,{
        headers: {
            'Authorization': localStorage.getItem( 'token' )
        }
    }).then((response) => {
        return response
    }).catch((error) => {
        console.log(error);
    })
}

export const addMeeting = (body) => {
    return axios.post('http://localhost:3000/api/meetings',body,{
        headers: {
            'Authorization': localStorage.getItem( 'token' )
        }
    }).then((response) => {
        return response
    }).catch((error) => {
        console.log(error);
    })
}

export const addUserToMeeting = (email,meetingId) => {
    return axios.patch(`http://localhost:3000/api/meetings/${meetingId}/addAttendee`,{
        email:email
    },{
        headers: {
            'Authorization': localStorage.getItem( 'token' )
        }
    }).then((response) => {
        return response
    }).catch((error) => {
        console.log(error);
    })
}

export const dropFromMeeting = (meetingId) => {
    console.log(meetingId);
    console.log(localStorage.getItem( 'token' ));
    return axios.patch(`http://localhost:3000/api/meetings/${meetingId}/drop`,{
        
    },{
        headers: {
            'Authorization': localStorage.getItem( 'token' )
        }
    }).then((response) => {
        return response
    }).catch((error) => {
        console.log(error);
    })
}