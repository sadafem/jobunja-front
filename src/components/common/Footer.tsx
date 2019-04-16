import React from 'react';

import styles from './Footer.module.css';

class Footer extends React.Component {

    render() {
        return (
            <div className={styles.container}>
                تمامی حقوق این سایت متعلق به جاب‌اونجا می‌باشد.
            </div>
        );
    }
}

export default Footer;
