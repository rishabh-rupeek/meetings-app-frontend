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