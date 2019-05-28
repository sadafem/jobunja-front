import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import styles from './Project.module.css';

import { persianNumberHumanize } from '../../utils';
import SkillBox from '../common/SkillBox';

class Project extends React.Component<Props, State> {

    bidInput = React.createRef<HTMLInputElement>();

    constructor(props: Props) {
        super(props);

        this.state = {
            project: null,
        };
    }

    componentDidMount() {
        this.fetchProject();
    }

    fetchProject() {
        axios
            .get(`/project/${this.props.match.params.projectId}`)
            .then(res => {
                console.log('project');
                console.log(res.data);
                this.setState({
                    project: res.data,
                });
            })
            .catch(err => {
                console.error(err);
                toast.error('دریافت اطلاعات با خطا مواجه شد!', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            })
    }

    submitBid = () => {
        const amount = parseInt(this.bidInput.current!.value);

        axios
            .post(
                '/api/project/bid/add',
                `amount=${amount}&projectID=${this.state.project!.id}`,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            )
            .then(() => {
                this.state.project!.bid = amount;
                this.setState({
                    project: this.state.project,
                });
            })
            .catch(err => {
                if (err.response && err.response.status === 403) {
                    toast.error('شما نمی‌توانید برای این پروژه پیشنهاد ثبت کنید!', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
                else {
                    console.error(err);
                    toast.error('ثبت پیشنهاد با خطا مواجه شد!', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            })
    }

    render() {
        const { project } = this.state;
        let expired = false;
        if (project) {
            expired = project.deadline < Date.now();
        }

        return (
            <div className={styles.content‌Background}>
                <div className="container">
                    {project === null
                        ? 'LOADING...'
                        : (
                            <div className={styles.projectDetailsBox}>
                                <div className={styles.projectDescSection}>
                                    <div className="row">
                                        <div className="col-3">
                                            <img
                                                className={styles.projectImg}
                                                src={project.imageUrl}
                                                alt="project"
                                            />
                                        </div>
                                        <div className="col-9">
                                            <div className="font-weight-bold size-xl">
                                                {project.title}
                                            </div>
                                            {expired
                                                ? (
                                                    <div className="margin-top-lg font-weight-bold size-md color-error">
                                                        <i className="flaticon-deadline"></i>
                                                        مهلت تمام شده
                                                    </div>
                                                )
                                                : (
                                                    <div className="margin-top-lg font-weight-bold size-md color-gray">
                                                        <i className="flaticon-deadline"></i>
                                                        زمان باقی‌مانده:{' '}
                                                        {persianNumberHumanize(
                                                            Math.floor((project.deadline - Date.now()) / (1000 * 60 * 60 * 24))
                                                        )}
                                                        {' '}روز و{' '}
                                                        {persianNumberHumanize(
                                                            Math.floor((project.deadline - Date.now()) / (1000 * 60 * 60) % 24)
                                                        )}
                                                        {' '}ساعت و{' '}
                                                        {persianNumberHumanize(
                                                            Math.floor((project.deadline - Date.now()) / (1000 * 60) % 60)
                                                        )}
                                                        {' '}دقیقه
                                                    </div>
                                                )
                                            }
                                            <div className="margin-top-sm font-weight-bold size-md color-primary">
                                                <i className="flaticon-money-bag"></i>
                                                بودجه: {persianNumberHumanize(project.budget)} تومان
                                            </div>
                                            {project.winner && (
                                                <div className="margin-top-sm font-weight-bold size-md color-success">
                                                    <i className="flaticon-check-mark"></i>
                                                    برنده: وحید محمدی
                                                </div>
                                            )}
                                            <div className={styles.projectDescTitle}>
                                                توضیحات
                                            </div>
                                            <div className={styles.projectDesc}>
                                                {project.description}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.projectSkillsContainer}>
                                    <div className={styles.projectSkillsTitle}>
                                        مهارت‌های لازم:
                                    </div>
                                    <div className="text-left ltr">
                                        {project.requiredSkills.map(skill => (
                                            <SkillBox
                                                key={skill.skill_name}
                                                skill={skill}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className={styles.projectBidSection}>
                                    {!expired && !project.bid && (
                                        <React.Fragment>
                                            <div className={styles.projectBidTitle}>
                                                ثبت پیشنهاد
                                            </div>
                                            <div className={styles.projectBidContainer}>
                                                <input ref={this.bidInput} className={styles.projectBidInput} placeholder="پیشنهاد خود را وارد کنید" />
                                                <span className={styles.projectBidUnit}>تومان</span>
                                                <div className="button" onClick={this.submitBid}>
                                                    ارسال
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    )}
                                    {project.bid && (
                                        <div className="color-success size-lg">
                                            <i className="flaticon-check-mark"></i>
                                            شما قبلا پیشنهاد خود را ثبت کرده‌اید.
                                        </div>
                                    )}
                                    {expired && !project.bid && (
                                        <div className="color-error size-lg">
                                            <i className="flaticon-danger"></i>
                                            مهلت ارسال پیشنهاد برای این پروژه به پایان رسیده است!
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

interface Props {
    match: any,
}

interface State {
    project: Project | null,
}

interface Project {
    id: string
    title: string,
    description: string
    imageUrl: string
    budget: number
    deadline: number
    requiredSkills: Skill[],
    bid?: number,
    winner?: string,
}

interface Skill {
    skill_name: string,
    point: number,
}

export default Project;
