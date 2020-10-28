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