import React from 'react';
import CreditsCounter from '@pages/sidepanel/components/header/header-right/CreditsCounter';
import styles from '@pages/sidepanel/components/header/header-right/header-right.module.scss';

const headerRight  = (credits) => {
  
    return (
      <div className='header-right-container'>
        <CreditsCounter credits={15} />
      </div>
    );
  };

export default headerRight;
