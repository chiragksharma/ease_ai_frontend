import CardContainer from '@pages/sidepanel/components/cards/CardContainer';
import React,{useContext,useEffect} from 'react';
import ActiveCardComponent from '@pages/sidepanel/components/ActiveCardComponent';
import { useCardContext } from '@pages/sidepanel/context/activeCard';

const ToolsSection = () => {
  const { activeCard } = useCardContext();

    return (
        <div className='cards'>
          {activeCard ? (
                <ActiveCardComponent />
            ) : (
                <CardContainer />
            )}
        </div>
    )
};

export default ToolsSection;