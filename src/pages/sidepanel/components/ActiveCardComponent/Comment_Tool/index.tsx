import React from 'react';
import OutlineDisplayCard from '@pages/sidepanel/static_components/outline_card';
import SmallTagCards from '@pages/sidepanel/static_components/small_tag_cards';
import "@pages/sidepanel/components/ActiveCardComponent/Comment_Tool/index.scss"


const VideoComment = ({ card }) => {
    const tags = [
        { name: 'Chill', icon: '🧊' },
        { name: 'Calm', icon: '🌊' },
        { name: 'Funny', icon: '🤣' },
        { name: 'Ask', icon: '❓' },
        { name: 'Appreciate', icon: '👏' }
    ];
    const title = "Tone of the comment"
    const children = <SmallTagCards tags={tags}/>
    return (
    <div className='tones-display-card-container'>        
      <OutlineDisplayCard title={title} children={children} />
    </div>
);
};

export default VideoComment;