import React from 'react';
import axios from 'axios';
import classNames from 'classnames';
import { toast } from 'react-toastify';

import styles from './Signup.module.css';

class Signup extends React.Component {
    firstNameInput = React.createRef<HTMLInputElement>();
    lastNameInput = React.createRef<HTMLInputElement>();
    usernameInput = React.createRef<HTMLInputElement>(); 
    passwordInput = React.createRef<HTMLInputElement>();
    jobNameInput = React.createRef<HTMLInputElement>();
    imageUrlInput = React.createRef<HTMLInputElement>(); 
    bioInput = React.createRef<HTMLTextAreaElement>();

    addUser = () => {
        const firstName = this.firstNameInput.current!.value;
        const lastName = this.lastNameInput.current!.value;
        const username = this.usernameInput.current!.value;
        const password = this.passwordInput.current!.value;
        const jobName = this.jobNameInput.current!.value;
        const imageUrl = this.imageUrlInput.current!.value;
        const bio = this.bioInput.current!.value;

        if(password.length < 5) {
            toast.error('رمز عبور شما باید حداقل ۵ کاراکتر باشد!', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            return;
        }
        if (!username || !password || !firstName || !lastName || !jobName) {
            toast.error('پرکردن تمام فیلدهای ستاره‌دار الزامیست', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            return;
        }

        axios
        .post(
            'api/user/add',
            `firstName=${encodeURIComponent(firstName)}`+
            `‍‍&lastName=${encodeURIComponent(lastName)}`+
            `‍‍&username=${encodeURIComponent(username)}`+
            `&password=${encodeURIComponent(password)}`+
            `&jobName=${encodeURIComponent(jobName)}`+
            `‍‍&imageUrl=${encodeURIComponent(imageUrl)}`+
            `‍‍&bio=${encodeURIComponent(bio)}`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        )
        .then(() => {
            toast.success('کاربر جدید اضافه شد.', {
                position: toast.POSITION.BOTTOM_RIGHT,
                pauseOnFocusLoss: false,
                pauseOnHover: false,
                onClose() {
                    location.href = '/login';
                },
            });
        })
        .catch(err => {
            if (err.response && err.response.status === 402) {
                toast.error('این نام کاربری قبلا ثبت شده است.');
            }
            else {
                console.error(err);
                toast.error('اضافه کردن کاربر با خطا مواجه شد!', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }
        })
    }
    render() {
        return (
        <React.Fragment>
            <div className={styles.contentBackground}>
                <div className="container">
                    <div className={styles.mainBox}>
                        <div className="row">
                            <div className="col-4">
                                <label className={styles.label}>نام کاربری*</label>
                                <input className={styles.input} ref={this.usernameInput}/>
                            </div>
                            <div className="col-4">
                                <label className={styles.label}>رمز عبور*</label>
                                <input className={styles.input} type="password" ref={this.passwordInput}/>
                            </div>
                            <div className="col-4">
                                <label className={styles.label}>آدرس تصویر</label>
                                <input className={styles.input} ref={this.imageUrlInput}/>
                            </div>
                            <div className="col-4 margin-top-lg">
                                <label className={styles.label}>نام*</label>
                                <input className={styles.input} ref={this.firstNameInput}/>
                            </div>
                            <div className="col-4 margin-top-lg">
                                <label className={styles.label}>نام خانوادگی*</label>
                                <input className={styles.input} ref={this.lastNameInput}/>
                            </div>
                            <div className="col-4 margin-top-lg">
                                <label className={styles.label}>عنوان شغلی*</label>
                                <input className={styles.input} ref={this.jobNameInput}/>
                            </div>
                            <div className="col-12 margin-top-lg">
                                <label className={styles.label}>بیوگرافی</label>
                                <textarea rows={5} className={styles.input} ref={this.bioInput}></textarea>
                            </div>
                            <div className="col-12 margin-top-lg">
                                <div className={styles.slideshow}>
                                    <div className={styles.slideWrapper}>
                                        <div className={styles.slide}><h1 className={styles.slideNumber}>1</h1></div>
                                        <div className={styles.slide}><h1 className={styles.slideNumber}>2</h1></div>
                                        <div className={styles.slide}><h1 className={styles.slideNumber}>3</h1></div>
                                        <div className={styles.slide}><h1 className={styles.slideNumber}>4</h1></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 margin-top-lg text-left">
                                <div className="button" onClick={this.addUser}>
                                    ثبت‌نام
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


export default Signup;
