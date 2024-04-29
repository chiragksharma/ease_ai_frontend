import React,{useState} from 'react';
import CreditsCounter from '@pages/sidepanel/components/header/header-right/CreditsCounter';
import ToggleButton from '@pages/sidepanel/components/header/header-right/ToggleDarkMode';

import SettingsIcon from '@assets/img/settings-icon.svg';

import '@pages/sidepanel/components/header/header-right/header-right.scss';

const headerRight  = (credits) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
    return (
      <div className='header-right-container'>
        <CreditsCounter credits={15} />
        <ToggleButton isDarkMode={isDarkMode} onToggle={toggleTheme} />
        <div className='header-right-settings-icon'>
            <img src={chrome.runtime.getURL(SettingsIcon)} alt="settings-icon" className='settings-icon'/>
        </div>
      </div>
    );
  };

export default headerRight;
