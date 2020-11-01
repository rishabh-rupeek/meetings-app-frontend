import axios from 'axios';

export const loginWithCredentials = (email,password) => {
    return axios.post('http://localhost:3000/api/auth/login',{
        email:email,
        password:password
    }).then((response) => {
        return response
    }).catch((error) => {
        console.log(error);
    })
}

export const registerWithCredentials = (body) => {
    return axios.post('http://localhost:3000/api/auth/register',body)
    .then((response) => {
        return response
    }).catch((error) => {
        console.log(error);
    })
}