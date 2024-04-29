import '@pages/sidepanel/components/header/header-right/ToggleDarkMode/index.scss';
import sunIcon from "@assets/img/sun_icon_light_mode.svg";
import MoonIcon from "@assets/img/Moon_icon_Dark_mode.svg";

const ToggleButton = ({ isDarkMode, onToggle }) => {
    return (
      <div id="toggle" onClick={onToggle} className={isDarkMode ? 'dark-mode' : 'light-mode'}>
        {/* <div className={`toggle-inner ${isDarkMode ? 'toggle-active' : ''}`} /> */}
        <img 
        src={isDarkMode ? chrome.runtime.getURL(MoonIcon) : chrome.runtime.getURL(sunIcon)}
        alt={isDarkMode ? "Dark Mode" : "Light Mode"}
        className={`toggle-icon ${isDarkMode ? "dark-mode" : ""}`}
      />
      </div>
    );
  };
  
export default ToggleButton;