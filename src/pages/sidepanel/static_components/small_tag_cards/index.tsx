import React,{useState} from 'react';
import "@pages/sidepanel/static_components/small_tag_cards/index.scss"

interface Tag {
    icon: JSX.Element|string;
    name: string;
}

interface SmallTagCardsProps {
    tags: Tag[];
    onTagClick: (tag: Tag) => void;  // Function to handle tag click
}

const SmallTagCards: React.FC<SmallTagCardsProps> = ({ tags, onTagClick }) => {
    const [selectedTag, setSelectedTag] = useState<string>("");

    const handleTagClick = (tag: Tag) => {
        setSelectedTag(tag.name); // Update the selected tag state
        onTagClick(tag); // Propagate the click to the parent component
    };
    return (
        <div className="small-tag-cards">
                {tags.map((tag, index) => (
                <button key={index} 
                className={`tag-button ${selectedTag === tag.name ? "selected" : ""}`}
                onClick={() => handleTagClick(tag)}>
                {tag.icon} {tag.name}
                </button>
            ))}
        </div>

)};

export default SmallTagCards;