import React from 'react';

import styles from './HomeProjectBox.module.css';

import { persianNumberHumanize } from '../../utils';

class HomeProjectBox extends React.Component<Props> {

    render() {
        const { project } = this.props;

        return (
            <div className={styles.container}>
                <div className="d-flex">
                    <div>
                        <img src={project.imageUrl} className={styles.image} />
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
                                    key={skill.name}
                                    className={styles.skill}
                                >
                                    {skill.name}
                                </div>
                            ))}
                        </div>
                        <div className={styles.remainingTime}>
                            زمان باقی‌مانده:
                        </div>
                    </div>
                </div>
            </div>
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
    name: string,
    point: number,
}

export default HomeProjectBox; 
