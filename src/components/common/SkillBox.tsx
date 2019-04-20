import React from 'react';
import classNames from 'classnames';

import styles from './SkillBox.module.css';

import { persianNumberHumanize } from 'src/utils';

class SkillBox extends React.Component<Props, State> {

    render() {
        const {
            skill,
            removable,
            endorsable,
            ...other
        } = this.props;

        return (
            <div
                className={
                    classNames({
                        [styles.skillContainer]: true,
                        [styles.removable]: removable,
                        [styles.endorsable]: endorsable,
                    })
                }
                {...other}
            >
                {skill.name}
                <div className={styles.skillPoint}>
                    {persianNumberHumanize(skill.point)}
                </div>
            </div>
        )
    }
}

interface Props {
    skill: Skill,
    removable?: boolean,
    endorsable?: boolean,
    [name: string]: any,
}

interface State {
}

interface Skill {
    name: string,
    point: number,
}

export default SkillBox;
