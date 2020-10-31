import axios from 'axios'

export const upload = (formData) => {
    localStorage.setItem('name',formData.get('name'));
    return axios.post(`http://localhost:3000/api/upload?email=${localStorage.getItem('email')}`,formData,{
            headers: {
                'Authorization': localStorage.getItem( 'token' )
            }
        })
        .then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        })
}