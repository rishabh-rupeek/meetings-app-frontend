import axios from 'axios';

export const getTeamsForUser = () => {
    return axios.get('http://localhost:3000/api/teams',{
        headers: {
            'Authorization': localStorage.getItem( 'token' )
        }
    }).then((response) => {
        return response
    }).catch((error) => {
        console.log(error);
    })
}

export const addUserToTeam = (email,teamId) => {
    return axios.patch(`http://localhost:3000/api/teams/${teamId}/addMember`,{
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

export const dropFromTeam = (teamId) => {
    console.log(teamId);
    console.log(localStorage.getItem( 'token' ));
    return axios.patch(`http://localhost:3000/api/teams/${teamId}/drop`,{
        
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

export const addTeam = (body) => {
    return axios.post('http://localhost:3000/api/teams',body,{
        headers: {
            'Authorization': localStorage.getItem( 'token' )
        }
    }).then((response) => {
        return response
    }).catch((error) => {
        console.log(error);
    })
}