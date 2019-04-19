import React from 'react';
import axios from 'axios';

import HomeUserBox from './HomeUserBox';
import HomeProjectBox from './HomeProjectBox';

import styles from './Home.module.css';

class Home extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            projects: null,
            users: null,
        };
    }

    componentDidMount () {
        this.fetchProjects();
        this.fetchUsers();
    }

    fetchProjects() {
        axios.get('/project')
            .then(res => {
                console.log('projects');
                console.log(res.data);
                this.setState({
                    projects: res.data,
                });
            })
            .catch(err => {
                console.error(err);
            });
    }

    fetchUsers() {
        axios.get('/user')
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
                        />
                        <div className={styles.searchSubmitButton}>
                            جستجو
                        </div>
                    </div>
                </div>
                <div style={{background: '#f6f6f6', marginTop: 60, boxShadow: '0 0 7px #ccc', minHeight: 'calc(100vh - 433px)'}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-lg-3">
                                <div style={{position: 'relative', top: -30}}>
                                    <div style={{borderRadius: 3, backgroundColor: 'white', padding: 5, boxShadow: '0 0 7px #ccc'}}>
                                        <input style={{backgroundColor: '#f6f6f6', border: 'none', width: '100%', fontSize: 16, padding: '8px 12px'}} placeholder="جستجو نام کاربر"></input>
                                    </div>
                                    {users === null
                                        ? 'LOADING...'
                                        : users.map(user => (
                                            <HomeUserBox
                                                key={user.id}
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
                                        <div style={{position: 'relative', top: -30}}>
                                            {projects.map(project => (
                                                <HomeProjectBox
                                                    key={project.id}
                                                    project={project}
                                                />
                                            ))}
                                        </div>
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
    projects: Project[] | null,
    users: User[] | null,
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
    id: number,
    firstName: string,
    lastName: string,
    jobTitle: string,
    profilePictureUrl: string,
    bio: string,
    skills: Skill[],
}

interface Skill {
    name: string,
    point: number,
}

export default Home; 
