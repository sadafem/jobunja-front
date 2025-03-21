/* eslint-disable no-restricted-globals */

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import './assets/fonts/iransans-fonts/fonts.css';
import './assets/icons/font/flaticon.css';
import './index.css';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './components/home/Home';
import User from './components/user/User';
import Project from './components/project/Project';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';

import * as serviceWorker from './serviceWorker';
import { parseJwt } from './utils';

axios.defaults.baseURL = 'http://172.18.0.4:8080/jobunja/';
const jwt = localStorage.getItem('jwt-token');
if (jwt) {
    const parsedJwt = parseJwt(jwt);
    if (parsedJwt.exp * 1000 < Date.now()) {
        localStorage.removeItem('jwt-token');
        if (location.pathname !== '/login' && location.pathname !== '/signup') {
            location.href = '/signup';
        }
    }
    else {
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
    }
}
else if (location.pathname !== '/login' && location.pathname !== '/signup') {
    location.href = '/signup';
}

ReactDOM.render(
    <React.Fragment>
        <ToastContainer
            pauseOnFocusLoss={false}
            rtl={true}
        />
        <div style={{paddingTop: 70}}>
            <Router>
                <Route path="/" component={(props: any) => <Header loggedIn={jwt !== null} {...props} />} />
                <Route exact path="/" component={Home} />
                <Route exact path="/user" component={User} />
                <Route exact path="/user/:username" component={User} />
                <Route exact path="/project/:projectId" component={Project} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/login" component={Login} />
                <Footer/>
            </Router>
        </div>
    </React.Fragment>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
