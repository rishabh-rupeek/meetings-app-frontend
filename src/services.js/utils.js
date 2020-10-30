import Vue from 'vue';
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