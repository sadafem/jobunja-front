import React from 'react';
import axios from 'axios';

import HomeUserBox from './HomeUserBox';
import HomeProjectBox from './HomeProjectBox';

import styles from './Home.module.css';

class Home extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            projectSearch: '',
            userSearch: '',
            projects: null,
            users: null,
            hasNextPage: false,
            currPage: 0,
        };
    }

    componentDidMount () {
        this.fetchProjects();
        this.fetchUsers();
    }

    handleProjectSearchInput = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            projectSearch: e.currentTarget.value,
        });
    }

    handleUserSearchInput = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            userSearch: e.currentTarget.value,
        });
    }

    handleUserSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            this.fetchUsers();
        }
    }

    fetchProjects = (append: boolean = false) => {
        axios
            .post(
                '/project',
                `limit=5&offset=${this.state.currPage * 5}&search=${this.state.projectSearch}`,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            )
            .then(res => {
                console.log('projects');
                console.log(res.data);
                this.setState(prevState => ({
                    projects: append ? prevState.projects!.concat(res.data) : res.data,
                    hasNextPage: res.data.length === 5,
                    currPage: append ? prevState.currPage + 1 : 1,
                }));
            })
            .catch(err => {
                console.error(err);
            });
    }

    fetchUsers() {
        axios
            .post(
                '/user',
                `search=${this.state.userSearch}`,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            )
            .then(res => {
                console.log('users');
                console.log(res.data);
                this.setState({
                    users: res.data,
                });
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        const {
            projects,
            users,
            hasNextPage,
        } = this.state;

        return (
            <React.Fragment>
                <div className="container" style={{marginTop: 40}}>
                    <h1 style={{color: '#3B818B'}}>جاب‌اونجا خوب است!</h1>
                    <div className={styles.headerDescription}>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
                    </div>
                    <div className={styles.searchContainer}>
                        <input
                            className={styles.searchInput}
                            type="text"
                            placeholder="جستجو در جاب‌اونجا"
                            onInput={this.handleProjectSearchInput}
                        />
                        <div
                            className={styles.searchSubmitButton}
                            onClick={() => this.fetchProjects()}
                        >
                            جستجو
                        </div>
                    </div>
                </div>
                <div style={{background: '#f6f6f6', marginTop: 60, boxShadow: '0 0 7px #ccc', minHeight: 'calc(100vh - 472px)'}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-lg-3">
                                <div style={{position: 'relative', top: -30}}>
                                    <div style={{borderRadius: 3, backgroundColor: 'white', padding: 5, boxShadow: '0 0 7px #ccc'}}>
                                        <input
                                            style={{backgroundColor: '#f6f6f6', border: 'none', width: '100%', fontSize: 16, padding: '8px 12px'}}
                                            placeholder="جستجو نام کاربر"
                                            onInput={this.handleUserSearchInput}
                                            onKeyPress={this.handleUserSearchKeyPress}
                                        />
                                    </div>
                                    {users === null
                                        ? 'LOADING...'
                                        : users.map(user => (
                                            <HomeUserBox
                                                key={user.username}
                                                user={user}
                                            />
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="col-12 col-lg-9">
                                {projects === null
                                    ? 'LOADING...'
                                    : (
                                        <React.Fragment>
                                            <div style={{position: 'relative', top: -30}}>
                                                {projects.map(project => (
                                                    <HomeProjectBox
                                                        key={project.id}
                                                        project={project}
                                                    />
                                                ))}
                                            </div>
                                            {hasNextPage && (
                                                <div
                                                    className="btn btn-primary"
                                                    style={{marginBottom: 40}}
                                                    onClick={() => this.fetchProjects(true)}
                                                >
                                                    پروژه‌های بیشتر
                                                </div>
                                            )}
                                        </React.Fragment>
                                    )
                                }
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
    projectSearch: string,
    userSearch: string,
    projects: Project[] | null,
    users: User[] | null,
    hasNextPage: boolean,
    currPage: number,
}

interface Project {
    id: string
    title: string,
    description: string
    imageUrl: string
    budget: number
    deadline: number
    requiredSkills: Skill[],
}

interface User {
    username: string,
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

export default Home; 
