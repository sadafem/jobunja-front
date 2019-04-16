import React from 'react';

import headerLogo from '../../assets/logo/logo v1.png';

import styles from './Header.module.css';

class Header extends React.Component {

    render() {
        return (
            <div className={styles.container}>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <img src={headerLogo} className={styles.logo} />
                        </div>
                        <div className="col-6 text-left d-flex align-items-center justify-content-end">
                            <a className="link" href="/user">
                                حساب کاربری
                            </a>
                            <a className="link margin-right-xl" href="/logout">
                                خروج
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
