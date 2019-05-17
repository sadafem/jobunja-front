import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { BrowserRouter as Router, Route} from 'react-router-dom';
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

import * as serviceWorker from './serviceWorker';

axios.defaults.baseURL = 'http://localhost:8080/';

ReactDOM.render(
    <React.Fragment>
        <ToastContainer
            rtl={true}
        />
        <div style={{paddingTop: 70}}>
            <Router>
                <Header/>
                <Route exact path="/" component={Home} />
                <Route exact path="/user" component={User} />
                <Route exact path="/user/:userId" component={User} />
                <Route exact path="/project/:projectId" component={Project} />
                <Route exact path="/signup" component={Signup} />
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
