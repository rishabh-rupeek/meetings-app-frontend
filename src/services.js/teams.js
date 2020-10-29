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