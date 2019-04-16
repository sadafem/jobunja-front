import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import 'src/'
import Users from './users/Users';

class UserProfile extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            user: null,
        }
    }
    componentDidMount() {
        axios.get()
        .then( res => {
            if(res.ok) return res.json()
        })
    }
    render() {
        return(
            <div id="content-background">
                <div className="container">
                    <div className="row">
                        <div className="col-3">
                            <div id="user-img-container">
                                <img src="http://www.ieeeaustsb.org/files/2017/05/placeholder-male-square.png" id="user-img"/>
                            </div>
                        </div>
                        <div className="col-9 margin-top-lg">
                            <div className="size-xl font-weight-bold">{this.state.user.name}محمدرضا کیانی</div>
                            <div className="margin-top-sm size-md color-gray">اعلی حضرت</div>
                        </div>
                        <div className="col-12 margin-top-lg">
                            <p className="text-justify">
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می‌باشد.
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می‌باشد.
                            </p>
                        </div>
                        <div className="col-12 margin-top-lg">
                            <span className="size-xl font-weight-bold">مهارت‌ها:</span>
                            <div id="new-skill-container" className="margin-right-lg">
                                
                                <select id="new-skill-select">
                                    <option value="1">-- انتخاب مهارت --</option>
                                    <option value="HTML">HTML</option>
                                    <option value="CSS">CSS</option>
                                    <option value="JavaScript">JavaScript</option>
                                    <option value="TypeScript">TypeScript</option>
                                </select>
                                <div className="button">
                                    افزودن مهارت
                                </div>
                            </div>
                        </div>
                        <div className="col-12 text-left ltr margin-top-lg">
                            <div className="skill-container">
                                HTML
                                <div className="skill-point success">+</div>
                            </div>
                            <div className="skill-container">
                                HTML
                                <div className="skill-point">5</div>
                            </div>
                            <div className="skill-container">
                                CSS
                                <div className="skill-point">3</div>
                            </div>
                            <div className="skill-container">
                                CSS
                                <div className="skill-point success">3</div>
                            </div>
                            <div className="skill-container">
                                JavaScript
                                <div className="skill-point">16</div>
                            </div>
                            <div className="skill-container">
                                TypeScript
                                <div className="skill-point">2</div>
                            </div>
                            <div className="skill-container">
                                TypeScript
                                <div className="skill-point error">-</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
interface Props{
    title: string
  }
  interface State{
    title: string
  }
  
  export default UserProfile;