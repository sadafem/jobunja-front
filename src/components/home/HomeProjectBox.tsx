import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import styles from './HomeProjectBox.module.css';

import { persianNumberHumanize } from '../../utils';

class HomeProjectBox extends React.Component<Props> {

    render() {
        const { project } = this.props;

        return (
            <Link
                to={`/project/${project.id}`}
                className={
                    classNames({
                        [styles.container]: true,
                        [styles.expired]: project.deadline < Date.now(),
                    })
                }
            >
                <div className="d-flex">
                    <div>
                        <img src={project.imageUrl} className={styles.image} alt="project" />
                    </div>
                    <div className={styles.projectInfo}>
                        <h5>
                            {project.title}
                        </h5>
                        <p className={styles.description}>
                            {project.description}
                        </p>
                        <div className={styles.budget}>
                            بودجه: {persianNumberHumanize(project.budget)} تومان
                        </div>
                        <div className={styles.skillsContainer}>
                            مهارت‌ها:
                            {project.requiredSkills.map(skill => (
                                <div
                                    key={skill.skill_name}
                                    className={styles.skill}
                                >
                                    {skill.skill_name}
                                </div>
                            ))}
                        </div>
                        {project.deadline < Date.now()
                            ? (
                                <div className={styles.remainingTime}>
                                    مهلت تمام شده
                                </div>
                            )
                            : (
                                <div className={styles.remainingTime}>
                                    زمان باقی‌مانده:{' '}
                                    {Math.floor((project.deadline - Date.now()) / (1000 * 60 * 60 * 24))}
                                    :
                                    {Math.floor((project.deadline - Date.now()) / (1000 * 60 * 60) % 24)}
                                    :
                                    {Math.floor((project.deadline - Date.now()) / (1000 * 60) % 60)}
                                </div>
                            )
                        }
                    </div>
                </div>
            </Link>
        );
    }
}

interface Props {
    project: Project,
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
    skill_name: string,
    point: number,
}

export default HomeProjectBox; 
