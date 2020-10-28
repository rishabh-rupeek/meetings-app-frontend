import axios from 'axios';

export const getMeetingsForUser = (givenDate) => {
    return axios.get(`http://localhost:3000/api/calendar?givenDate=${givenDate}`,{
        headers: {
            'Authorization': localStorage.getItem( 'token' )
        }
    }).then((response) => {
        return response
    }).catch((error) => {
        console.log(error);
    })
}