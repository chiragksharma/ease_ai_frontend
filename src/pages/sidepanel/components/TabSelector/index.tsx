// ButtonBar.tsx
import React, { useState } from 'react';
import '@pages/sidepanel/components/TabSelector/index.scss'; // Make sure to create a corresponding CSS file

type TabSelectorProps = {
    // Define any props here if needed
};

const TabSelector: React.FC<TabSelectorProps> = () => {
    const [activeTab, setActiveTab] = useState('Tools');  // Default active tab
    const [highlightStyle, setHighlightStyle] = useState({});  // State to handle highlight styles
  
    const tabs = ['Tools', 'AI Coach', 'My Channel'];
  
    const updateHighlight = (element) => {
        const extraOffset = 2; // Adjust this value based on your specific CSS if needed
        const buttonPadding = 2; // Adjust if your button padding affects highlight sizing
      setHighlightStyle({
        left: `${element.offsetLeft- extraOffset}px`,
        width: `${element.offsetWidth+ buttonPadding}px`
      });
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
      <div className="tabs-button-bar" onMouseOut={() => updateHighlight(document.querySelector('.button-bar-item.active'))}>
        <div className="highlight" style={highlightStyle}></div>
        {tabs.map(tab => (
          <button
            key={tab}
            className={`button-bar-item ${activeTab === tab ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}
            onMouseOver={handleMouseOver}
          >
            {tab}
          </button>
        ))}
      </div>
    );
  };
  
  export default TabSelector;
