import React from 'react';
import { Link } from 'react-router-dom';

import styles from './HomeUserBox.module.css';

class HomeUserBox extends React.Component<Props> {

    render() {
        const { user } = this.props;

        return (
            <Link to={`/user/${user.username}`}  className={styles.container}>
                <div className="d-flex align-items-center">
                    <div>
                        <img
                            src={user.profilePictureUrl || 'http://www.ieeeaustsb.org/files/2017/05/placeholder-male-square.png'}
                            className={styles.image}
                        />
                    </div>
                    <div>
                        {user.firstName}{' '}{user.lastName}
                        <div className={styles.jobTitle}>
                            {user.jobTitle}
                        </div>
                    </div>
                </div>
            </Link>
        );
    }
}

interface Props {
    user: User,
}

interface User {
    username:string,
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

export default HomeUserBox; 
