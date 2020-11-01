import Vue from 'vue';
import axios from 'axios';
import VueToast from 'vue-toast-notification';
// Import one of available themes
import 'vue-toast-notification/dist/theme-default.css';
//import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(VueToast);

export function sendNotification (message,type) {
    //console.log(message);
    Vue.$toast.open({
        message: message,
        type: type,
        duration: 4000,
        dismissible: true
    })
}

export function getProfilePicture(email) {
    return axios
    .get(`http://localhost:3000/profile-images/${email}.jpg`, {
      responseType: 'arraybuffer'
    })
    .then(response => Buffer.from(response.data, 'binary').toString('base64'))
    .catch((err) => {
        console.log(err+'ni');
    })
}

export function  getDefaultPicture() {
    return axios.get('http://localhost:3000/profile-images/default.jpg', {
        responseType: 'arraybuffer'
        })
        .then(response => Buffer.from(response.data,'binary').toString('base64'))
        .catch((error)=>{
            console.log(error + 'Default image missing');
        })
}