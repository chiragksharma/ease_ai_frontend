import React from 'react';
import "@pages/sidepanel/static_components/small_tag_cards/index.scss"

// sample Tags = ['Chill', 'Calm', 'Funny', 'Ask', 'Appreciate']
const SmallTagCards = ({ tags }) => {


    return (
 
        <div className="small-tag-cards">
                {tags.map((tag, index) => (
                <button key={index} className="tag-button">
                {tag}
                </button>
            ))}
        </div>

)};

export default SmallTagCards;