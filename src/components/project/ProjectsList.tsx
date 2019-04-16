import React from 'react';
import axios from 'axios';

import ProjectOverview from './ProjectOverview';

import styles from './ProjectsList.module.css';

class ProjectsList extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            projects: null,
        };
    }

    componentDidMount () {
        axios.get('/project')
            .then(res => {
                this.setState({
                    projects: res.data,
                });
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        const { projects } = this.state;

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
                        {projects === null
                            ? 'LOADING...'
                            : (
                                <div style={{position: 'relative', top: -30}}>
                                    {projects.map(project => (
                                        <ProjectOverview
                                            key={project.id}
                                            project={project}
                                        />
                                    ))}
                                </div>
                            )
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

interface Props {
    yourName: String,
}

interface State {
    projects: Project[] | null,
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

interface Skill {
    name: string,
    point: number,
}

export default ProjectsList; 
