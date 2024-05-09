import React from 'react';
import OutlineDisplayCard from '@pages/sidepanel/static_components/outline_card';
import SmallTagCards from '@pages/sidepanel/static_components/small_tag_cards';
import "@pages/sidepanel/components/ActiveCardComponent/Thumbnail_Analyzer_Tool/index.scss"


const ThumbnailAnalysisComponent = ({ card }) => {
    const tags = ['Chill', 'Calm', 'Funny', 'Ask', 'Appreciate']
    const title = "Tones"
    const children = <SmallTagCards tags={tags}/>
    return (
    <div className='tones-display-card-container'>
        {/* Implementation specific to Thumbnail Analysis */}
        
      <OutlineDisplayCard title={title} children={children} />
    </div>
);
};

export default ThumbnailAnalysisComponent;