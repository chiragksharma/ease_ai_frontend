import React, { useState } from 'react';
import '@pages/sidepanel/components/TabSelector/index.scss'; // Make sure to create a corresponding CSS file

// Three components
import AICoach from '@pages/sidepanel/components/ai_Coach';
import ToolsSection from '@pages/sidepanel/components/Tools';
import ChannelAnalytics from '@pages/sidepanel/components/channel_analysis';


type TabSelectorProps = {
    // Define any props here if needed
};

const TabSelector: React.FC<TabSelectorProps> = () => {
    const [activeTab, setActiveTab] = useState('Tools');  // Default active tab
    const [highlightStyle, setHighlightStyle] = useState({});  // State to handle highlight styles
  
    //const tabs = ['Tools', 'AI Coach', 'My Channel'];
    
    const tabs = [
        { name: 'Tools', component: <ToolsSection /> },
        { name: 'AI Coach', component: <AICoach /> },
        { name: 'My Channel', component: <ChannelAnalytics /> }
    ];
    const updateHighlight = (element) => {
        const extraOffset = 2; // Adjust this value based on your specific CSS if needed
        const buttonPadding = 2; // Adjust if your button padding affects highlight sizing
      setHighlightStyle({
        left: `${element.offsetLeft- extraOffset}px`,
        width: `${element.offsetWidth+ buttonPadding}px`
      });
    };
    const getActiveComponent = () => {
        const active = tabs.find(tab => tab.name === activeTab);
        return active ? active.component : null;
    };
    const handleMouseOver = (event) => {
      updateHighlight(event.target);
    };
  
    const handleTabClick = (tabName) => {
      setActiveTab(tabName);
      const tabButton = document.querySelector(`.button-bar-item.${tabName.replace(/\s+/g, '-')}`);
      updateHighlight(tabButton);
    };
  
    return (
        <div className='tabs-conatiner'>
            <div className="tabs-button-bar" onMouseOut={() => updateHighlight(document.querySelector('.button-bar-item.active'))}>
                <div className="highlight" style={highlightStyle}></div>
                {tabs.map(tab => (
                    <button
                        key={tab.name}
                        className={`button-bar-item ${activeTab === tab.name ? 'active' : ''}`}
                        onClick={() => handleTabClick(tab.name)}
                        onMouseOver={handleMouseOver}
                    >
                        {tab.name}
                    </button>
                ))}
            </div>
            <div className="tab-content">
                {getActiveComponent()}
            </div>
        </div>
    );
  };
  
  export default TabSelector;
