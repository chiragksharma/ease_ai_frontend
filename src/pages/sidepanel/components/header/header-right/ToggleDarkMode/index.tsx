import '@pages/sidepanel/components/header/header-right/ToggleDarkMode/index.scss';
import sunIcon from "@assets/img/sun_icon_light_mode.svg";
import MoonIcon from "@assets/img/Moon_icon_Dark_mode.svg";

const ToggleButton = ({ onToggle,theme }) => {
    return (
      <div id="toggle" onClick={onToggle} className={theme ? 'dark' : 'light'}>
        {/* <div className={`toggle-inner ${isDarkMode ? 'toggle-active' : ''}`} /> */}
        <img 
        src={theme ? chrome.runtime.getURL(MoonIcon) : chrome.runtime.getURL(sunIcon)}
        alt={theme ? "Dark Mode" : "Light Mode"}
        className={`toggle-icon ${theme ? "light" : "dark"}`}
      />
      </div>
    );
  };
  
export default ToggleButton;