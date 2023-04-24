let baseUrl;
if(window.location.hostname == 'localhost') {
    console.log(import.meta.env);
    baseUrl = window.location.protocol + '//localhost:'+import.meta.env['VITE_BE_DEV_PORT'];
} else {
    baseUrl = window.location.protocol + '//' + window.location.hostname;
}

// baseUrl = "https://gpu-driver-be.herokuapp.com";

import axios from 'axios'

const api = {
    post(endpoint, params={}) {
        const url = baseUrl + endpoint;
        console.log("Posting to " + url);
        return axios.post(url, new URLSearchParams(params));
    },
    get(url, params={}) {
        return axios.get(baseUrl + url, params);
    }
}

export default api;