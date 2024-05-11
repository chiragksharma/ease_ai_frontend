import React from 'react';
import backButton from "@assets/img/chevron-left.svg";
import "@pages/sidepanel/components/ActiveCardComponent/index.scss";
import ThumbnailAnalysisComponent from '@pages/sidepanel/components/ActiveCardComponent/Thumbnail_Analyzer_Tool';
import VideoComment from '@pages/sidepanel/components/ActiveCardComponent/Comment_Tool';
import { useCardContext } from '@pages/sidepanel/context/activeCard';
import { ActiveCardProvider } from '@pages/sidepanel/context/storageUpdateContext';



const cardComponents = {
    'video_analyzer': ThumbnailAnalysisComponent,
    'video_comment': VideoComment,
    // 'video-effectiveness': VideoEffectivenessComponent,
    // Add more mappings as needed
};

const ActiveCardComponent = () => {
    const { activeCard, deactivateCard } = useCardContext();
    const CardSpecificComponent = cardComponents[activeCard.type] || (() => <div>No component available for this type</div>);


    return (
        <ActiveCardProvider activeCard={activeCard}>
        <div className="active-card">
            <div className='active-card-header'>
                <div className='ative-card-back-icon' onClick={deactivateCard}>
                    <img src={chrome.runtime.getURL(backButton)} alt='back button' className='back-button'/>
                </div>
                <div className='active-card-header-title'>
                  {activeCard.name}
                </div>
            </div>
            <div className='active-card-component'>
                <CardSpecificComponent card={activeCard} />
            </div>
        </div>
        </ActiveCardProvider>
    );
};

export default ActiveCardComponent;
