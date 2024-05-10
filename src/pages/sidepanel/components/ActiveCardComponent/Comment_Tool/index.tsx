import React from 'react';
import OutlineDisplayCard from '@pages/sidepanel/static_components/outline_card';
import SmallTagCards from '@pages/sidepanel/static_components/small_tag_cards';
import Button from '@pages/sidepanel/static_components/button';
import InputField from '@pages/sidepanel/static_components/input_field';
import "@pages/sidepanel/components/ActiveCardComponent/Comment_Tool/index.scss"




const VideoComment = ({ card }) => {
    const tags = [
        { name: 'Chill', icon: '🧊' },
        { name: 'Calm', icon: '🌊' },
        { name: 'Funny', icon: '🤣' },
        { name: 'Ask', icon: '❓' },
        { name: 'Appreciate', icon: '👏' }
    ];
    
    const small_tag_cards = <SmallTagCards tags={tags}/>
    const video_details = "Title"
    const custom_instructions = <InputField placeholder='Enter Custom Instruction'/>
    return (
    <div className='tones-display-card-container'>   
        <OutlineDisplayCard title="Video Description" children={video_details} />     
        <OutlineDisplayCard title="Custom Instructions" children={custom_instructions} />
        <OutlineDisplayCard title="Tone of the comment" children={small_tag_cards} />
        <Button title='Generate'/>
    </div>
);
};

export default VideoComment;