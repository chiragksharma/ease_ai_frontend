import React from 'react';
import "@pages/sidepanel/static_components/small_tag_cards/index.scss"

const SmallTagCards = ({ tags }) => {
    return (
        <div className="small-tag-cards">
                {tags.map((tag, index) => (
                <button key={index} className="tag-button">
                {tag.icon} {tag.name}
                </button>
            ))}
        </div>

)};

export default SmallTagCards;