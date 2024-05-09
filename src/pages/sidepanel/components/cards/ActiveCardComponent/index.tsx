import React from 'react';
import "@pages/sidepanel/components/cards/ActiveCardComponent/index.scss";

const ActiveCardComponent = ({ card, onBack }) => {
    return (
        <div className="active-card">
            <button onClick={onBack}>Back</button>
            <h1>{card.name}</h1>
            <p>{card.description}</p>
        </div>
    );
};

export default ActiveCardComponent;
