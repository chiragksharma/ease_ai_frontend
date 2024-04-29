import React from 'react';
import styles from '@pages/sidepanel/components/header/header-right/CreditsCounter/CreditsCounter.module.scss';

interface CreditsCounterProps {
  credits: number;
}


const CreditsCounter: React.FC<CreditsCounterProps> = ({ credits }) => {
  // Assuming a full circle at 15 credits, calculate degrees.
  const maxCredits = 15;
  const degrees = (credits / maxCredits) * 360;  // Full circle is 360 degrees   
  
  return (
    <div className={styles['credits-counter']}>
      <div className={styles['credits-counter__number']}>{credits}</div>
      <div className={styles['credits-counter__progress-bar']} style={{ transform: `rotate(${degrees - 90}deg)` }}>
        <div className={`${styles['credits-counter__progress-bar']}::after`}></div>
      </div>
    </div>
  );
};

export default CreditsCounter;
