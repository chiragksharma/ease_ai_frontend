import React from 'react';
import styles from '@pages/sidepanel/components/header/header-right/CreditsCounter/CreditsCounter.module.scss';

interface CreditsCounterProps {
  credits: number;
}


const CreditsCounter: React.FC<CreditsCounterProps> = ({ credits }) => {
  // Assuming a full circle at 15 credits, calculate degrees.
  // Each credit represents 360 / 15 = 24 degrees.
  const degrees = 360 - (credits / 15) * 360;
    // Define your progress and track colors here
   
  
  return (
    <div className={styles['credits-counter']}>
      <div className={styles['credits-counter__number']}>{credits}</div>
      <div className={styles['credits-counter__progress']} style={{ transform: `rotate(${degrees}deg)` }}>
        <div className={`${styles['credits-counter__progress-bar']}::after`}></div>
      </div>
       
    </div>
  );
};

export default CreditsCounter;
