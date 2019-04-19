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

import * as serviceWorker from './serviceWorker';

axios.defaults.baseURL = 'http://localhost:8080/';

ReactDOM.render(
    <React.Fragment>
        <ToastContainer
            rtl={true}
        />
        <Header/>
        <div style={{paddingTop: 70}}>
            <Router>
                <Route exact path="/" component={Home} />
                <Route exact path="/user" component={User} />
                <Route exact path="/user/:userId" component={User} />
            </Router>
        </div>
        <Footer/>
    </React.Fragment>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
