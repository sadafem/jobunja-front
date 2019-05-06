import React from 'react';
import axios from 'axios';
import classNames from 'classnames';
import { toast } from 'react-toastify';

import styles from './User.module.css';
import SkillBox from '../common/SkillBox';

class User extends React.Component<Props, State> {

    skillInput = React.createRef<HTMLSelectElement>();

    constructor(props: Props) {
        super(props);

        this.state = {
            user: null,
            skillNames: null,
        };
    }

    componentDidMount() {
        this.fetchUser();
        this.fetchSkills();
    }

    fetchUser() {
        axios
            .get(`/user/${this.props.match.params.userId || 1}`)
            .then(res => {
                console.log('user');
                console.log(res.data);
                this.setState({
                    user: res.data,
                });
            })
            .catch(err => {
                console.error(err);
                toast.error('دریافت اطلاعات با خطا مواجه شد!', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            });
    }

    fetchSkills() {
        axios
            .get('/skill')
            .then(res => {
                console.log('skillNames');
                console.log(res.data);
                this.setState({
                    skillNames: res.data,
                });
            })
            .catch(err => {
                console.error(err);
                toast.error('دریافت اطلاعات با خطا مواجه شد!', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            });
    }

    handleSkillClick = (skillName: string) => {
        if ((this.props.match.params.userId || '1') === '1') {
            this.removeSkill(skillName);
        }
        else {
            this.endorseSkill(skillName);
        }
    }

    addSkill = () => {
        const skillName = this.skillInput.current!.value;
        if (!skillName) {
            return;
        }

        axios
            .post(
                '/api/user/skill/add',
                `skillName=${encodeURIComponent(skillName)}`,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            )
            .then(() => {
                toast.success('مهارت جدید اضافه شد!', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                const user = this.state.user!;
                user.skills.push({
                    skill_name: skillName,
                    point: 0,
                });
                this.setState({
                    user,
                });
            })
            .catch(err => {
                console.error(err);
                toast.error('اضافه کردن مهارت با خطا مواجه شد!', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            })
    }

    removeSkill = (skillName: string) => {
        axios
            .post(
                '/api/user/skill/delete',
                `skillName=${encodeURIComponent(skillName)}`,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            )
            .then(() => {
                toast.success('مهارت مورد نظر حذف شد!', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                const user = this.state.user!;
                user.skills = user.skills.filter(skill => skill.skill_name !== skillName);
                this.setState({
                    user,
                });
            })
            .catch(err => {
                if (err.response && err.response.status === 404) {
                    toast.error('مهارت مورد نظر در لیست مهارت‌های شما وجود ندارد!', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
                else {
                    console.error(err);
                    toast.error('حذف مهارت با خطا مواجه شد!', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            });
    }

    endorseSkill = (skillName: string) => {
        axios
            .post(
                '/api/user/skill/endorse',
                `userId=${this.props.match.params.userId}&skillName=${skillName}`,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            )
            .then(() => {
                toast.success('امتیازدهی به مهارت انجام شد!', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                const user = this.state.user!;
                const skill = user.skills.find(skill => skill.skill_name === skillName);
                if (skill) {
                    skill.point++;
                }
                this.setState({
                    user,
                });
            })
            .catch(err => {
                if (err.response.status === 403) {
                    toast.info('شما قبلا به این مهارت امتیاز داده اید!', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
                else {
                    console.error(err);
                    toast.error('امتیازدهی با خطا مواجه شد!', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            });
    }

    render() {
        const {
            user,
            skillNames,
        } = this.state;

        return (
            <React.Fragment>
                <div className={styles.contentBackground}>
                    {user === null
                        ? 'LOADING...'
                        : (
                            <div className="container">
                                <div className="row">
                                    <div className="col-3">
                                        <div className={styles.imageContainer}>
                                            <img src={user.profilePictureUrl || 'http://www.ieeeaustsb.org/files/2017/05/placeholder-male-square.png'} className={styles.image}/>
                                        </div>
                                    </div>
                                    <div className="col-9 margin-top-lg">
                                        <div className="size-xl font-weight-bold">
                                            {user.firstName}{' '}{user.lastName}
                                        </div>
                                        <div className="margin-top-sm size-md color-gray">
                                            {user.jobTitle}
                                        </div>
                                    </div>
                                    <div className="col-12 margin-top-lg">
                                        <p className="text-justify">
                                            {user.bio}
                                        </p>
                                    </div>
                                    {skillNames && (this.props.match.params.userId || '1') === '1' && (
                                        <div className="col-12 margin-top-lg">
                                            <span className="size-xl font-weight-bold">مهارت‌ها:</span>
                                            <div className={classNames(styles.newSkillContainer, 'margin-right-lg')}>
                                                <select className={styles.newSkillSelect} ref={this.skillInput}>
                                                    <option value="">-- انتخاب مهارت --</option>
                                                    {skillNames.map(skillName => (
                                                        !user.skills.map(skill => skill.skill_name).includes(skillName) && (
                                                            <option key={skillName} value={skillName}>{skillName}</option>
                                                        )
                                                    ))}
                                                </select>
                                                <div className="button" onClick={this.addSkill}>
                                                    افزودن مهارت
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="col-12 text-left ltr margin-top-lg">
                                        {user.skills.map(skill => (
                                            <SkillBox
                                                key={skill.skill_name}
                                                skill={skill}
                                                removable={(this.props.match.params.userId || '1') === '1'}
                                                endorsable={(this.props.match.params.userId || '1') !== '1'}
                                                onClick={() => this.handleSkillClick(skill.skill_name)}
                                            />
                                        ))}
                                    </div>    
                                </div>  
                            </div>    
                        )
                    }
                </div>              
            </React.Fragment>
        )
    }
}

interface Props {
    match: any,
}

interface State {
    user: User | null,
    skillNames: string[] | null,
}

interface User {
    id: number,
    firstName: string,
    lastName: string,
    jobTitle: string,
    profilePictureUrl: string,
    bio: string,
    skills: Skill[],
}

interface Skill {
    skill_name: string,
    point: number,
}

export default User;
