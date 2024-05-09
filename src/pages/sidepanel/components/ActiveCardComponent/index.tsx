import React from 'react';
import backButton from "@assets/img/chevron-left.svg";
import "@pages/sidepanel/components/ActiveCardComponent/index.scss";
import { useCardContext } from '@pages/sidepanel/context/activeCard';

const ActiveCardComponent = () => {
    const { activeCard, deactivateCard } = useCardContext();

    return (
        <div className="active-card">
            <div className='active-card-header'>
                <div className='ative-card-back-icon' onClick={deactivateCard}>
                    <img src={chrome.runtime.getURL(backButton)} alt='back button' className='back-button'/>
                </div>
                <div className='active-card-header-title'>
                  {activeCard.name}
                </div>
            </div>
        </div>
    );
};

export default ActiveCardComponent;
