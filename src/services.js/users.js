import axios from 'axios';

export const getUsers = () => {
    return axios.get('http://localhost:3000/api/users',{
        headers: {
            'Authorization': localStorage.getItem( 'token' )
        }
    }).then((response) => {
        return response
    }).catch((error) => {
        console.log(error);
    })
}