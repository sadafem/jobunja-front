/* eslint-disable no-restricted-globals */

import React from 'react';
import { Link } from 'react-router-dom';

import headerLogo from '../../assets/logo/logo v1.png';

import styles from './Header.module.css';
import { parseJwt } from '../../utils';

class Header extends React.Component<Props> {

    logout() {
        localStorage.removeItem('jwt-token');
        location.href = '/login';
    }

    render() {
        const { loggedIn, location } = this.props;
        let username;
        if (loggedIn) {
            const jwt = localStorage.getItem('jwt-token');
            if (jwt) {
                const parsedJwt = parseJwt(jwt);
                username = parsedJwt.username;
            }
        }

        return (
            <div className={styles.container}>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            {loggedIn ? (
                                <Link to="/">
                                    <img src={headerLogo} className={styles.logo} alt="logo" />
                                </Link>
                            ) : (
                                <img src={headerLogo} className={styles.logo} alt="logo" />
                            )}
                        </div>
                        <div className="col-6 text-left d-flex align-items-center justify-content-end">
                            {loggedIn ? (
                                <React.Fragment>
                                    <Link className="link" to={`/user/${username}`}>
                                        حساب کاربری
                                    </Link>
                                    <span className="link margin-right-xl" onClick={this.logout}>
                                        خروج
                                    </span>
                                </React.Fragment>
                            ) : (
                                <Link className="link" to={location.pathname === '/login' ? '/signup' : '/login'}>
                                    {location.pathname === '/login' ? 'ثبت‌نام' : 'ورود'}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

interface Props {
    loggedIn: boolean,
    location: any,
}

export default Header;
