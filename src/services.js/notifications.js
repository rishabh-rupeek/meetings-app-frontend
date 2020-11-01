import axios from 'axios'

export function addNotification(body) {
    return axios.post('http://localhost:3000/api/notifications',body,{
        headers: {
            'Authorization': localStorage.getItem( 'token' )
        }
    }).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    })
}

export function getNotificationsForUser() {
    return axios.get('http://localhost:3000/api/notifications',{
        headers: {
            'Authorization': localStorage.getItem( 'token' )
        }
    }).then((response) => {
        console.log(response);
        return response;
    }).catch((error) => {
        console.log(error);
    })
}