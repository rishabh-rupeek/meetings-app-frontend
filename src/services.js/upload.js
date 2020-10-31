import axios from 'axios'
import { sendNotification } from '../services.js/utils'

export const upload = (formData) => {
    localStorage.setItem('name',formData.get('name'));
    console.log(formData);
    return axios.post(`http://localhost:3000/api/upload?email=${localStorage.getItem('email')}`,formData,{
            headers: {
                'Authorization': localStorage.getItem( 'token' ),
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((result) => {
            console.log(result);
            sendNotification("Profile Updated","success");
        }).catch((err) => {
            console.log(err);
            sendNotification("Incorrect Old Password, password can't be changed","error");
        })
}