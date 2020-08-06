import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import serviceWorker from './serviceWorker';
import axios from 'axios';

let myInt = axios.interceptors.response.use(response => {
    console.log(1 + response);
    return response;
}, error => {
    console.log(2 + error);
    return Promise.reject(error);
});

axios.interceptors.response.eject(myInt);

ReactDOM.render( <App />, document.getElementById( 'root' ) );
serviceWorker();
