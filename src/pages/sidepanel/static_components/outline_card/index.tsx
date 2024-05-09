import React from 'react';
import "@pages/sidepanel/static_components/outline_card/index.scss"

const OutlineDisplayCard = ({ title,children }) => (
 
        <div className="display-card-container">
            <div className="card-header">{title}</div>
            <div className="divider-line"></div> 
            <div className="card-content">
                {children}
            </div>
        </div>

);

export default OutlineDisplayCard;