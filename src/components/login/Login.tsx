import React, { FormEvent } from 'react';
import axios from 'axios';
import qs from 'querystring';

import { toast } from 'react-toastify';

import styles from './Login.module.css';

class Login extends React.Component {
    usernameInput = React.createRef<HTMLInputElement>();
    passwordInput = React.createRef<HTMLInputElement>();

    login = (e: FormEvent) => {
        e.preventDefault();
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
                pauseOnFocusLoss: false,
                pauseOnHover: false,
                onClose() {
                    location.href = '/';
                },
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
            <form onSubmit={this.login}>
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
                                    <button className="button" type="submit">
                                        ورود
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}


export default Login;
