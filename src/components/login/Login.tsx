import React from 'react';
import axios from 'axios';
import classNames from 'classnames';
import qs from 'querystring';

import { toast } from 'react-toastify';

import styles from './Login.module.css';

class Login extends React.Component<Props, State> {
    usernameInput = React.createRef<HTMLInputElement>();
    passwordInput = React.createRef<HTMLInputElement>();

    addUser = () => {
        const username = this.usernameInput.current!.value;
        const password = this.passwordInput.current!.value;

        axios
        .post(
            'api/login',
            qs.stringify({
                username,
                password,
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        )
        .then(res => {
            localStorage.setItem('jwt-token', res.data);
            toast.success('با موفقیت وارد شدید.', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        })
        .catch(err => {
            console.error(err);
            toast.error('نام کاربری یا رمز عبور اشتباه است!', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        })
    }
    render() {
        return (
        <React.Fragment>
            <div className={styles.contentBackground}>
                <div className="container">
                    <div className={styles.mainBox}>
                        <div className="row">
                            <div className="col-6">
                                <label className={styles.label}>نام کاربری</label>
                                <input className={styles.input} ref={this.usernameInput}/>
                            </div>
                            <div className="col-6">
                                <label className={styles.label}>رمز عبور</label>
                                <input className={styles.input} type="password" ref={this.passwordInput}/>
                            </div>
                            <div className="col-12 margin-top-lg text-left">
                                <div className="button" onClick={this.addUser}>
                                    ورود
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
        )
    }
}


interface Props {
}

interface State {
}

export default Login;
