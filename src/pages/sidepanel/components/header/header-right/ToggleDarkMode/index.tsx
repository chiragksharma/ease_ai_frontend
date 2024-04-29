import '@pages/sidepanel/components/header/header-right/ToggleDarkMode/index.scss';

const ToggleButton = ({ isDarkMode, onToggle }) => {
    return (
      <div id="toggle" onClick={onToggle} style={{ backgroundColor: isDarkMode ? '#4A5568' : '#1a202c' }}>
        <div className={`toggle-inner ${isDarkMode ? 'toggle-active' : ''}`} />
      </div>
    );
  };
  
export default ToggleButton;