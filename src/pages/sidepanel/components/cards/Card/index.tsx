import React,{useState,useEffect} from 'react';
import { Card as CardInterface } from "@pages/sidepanel/types";
import iconMap from '@pages/sidepanel/components/cards/icons/iconMap';
import { useTheme } from '@pages/sidepanel/hooks/useTheme';
import "@pages/sidepanel/components/cards/Card/index.scss";

// Props interface to type-check our props
interface CardComponentProps extends CardInterface {}

const CardComponent: React.FC<CardComponentProps> = (props) => {
  const { name,icon ,description, inputFields, tags, category } = props;
  const [theme] = useTheme();
  console.log("Current Theme: ",theme)

  const iconIndex = theme === 'dark' ? 1 : 0;
  const Icon = iconMap[icon][iconIndex];

  return (
    <div className="card">
    <div className='card-title-section'>
        <div className='card-icon'>
          <img src={Icon} alt={`${name} icon`}/>
        </div>
        <div className='card-title'>
        {name}
        </div>

    </div>
    <div className='card-description'>
      {description}
    </div>
      {/* <h3>{name}</h3>
      <p>{description}</p>
      <div className="tags">
        {tags.map((tag, idx) => (
          <span key={idx} className="tag">{tag}</span>
        ))}
      </div>
      <div className="category">{category}</div> */}
      {/* Render other card properties as needed */}
    </div>
  );
};

export default CardComponent;
