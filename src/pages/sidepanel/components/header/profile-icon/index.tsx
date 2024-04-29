import React from 'react';
import styles from '@pages/sidepanel/components/header/profile-icon/profileIcon.module.scss';

const ProfileIcon = ({ imageUrl }) => (
  <div className={styles.iconContainer}>
    <img src={imageUrl} alt="Profile" className={styles.image} />
  </div>
);

export default ProfileIcon;
