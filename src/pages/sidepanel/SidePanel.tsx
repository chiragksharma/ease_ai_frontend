import React from 'react';
import logo from '@assets/img/logo.svg';
import '@pages/sidepanel/SidePanel.css';
import useStorage from '@src/shared/hooks/useStorage';
import exampleThemeStorage from '@src/shared/storages/exampleThemeStorage';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import Header from '@pages/sidepanel/components/header';
import Suggestions from '@pages/sidepanel/components/suggestion-cards/index';
import ChatInput from '@pages/sidepanel/components/ChatInput';


const SidePanel = () => {
  const theme = useStorage(exampleThemeStorage);

  return (
    <div
      className="App"
      style={{
        backgroundColor:'white',
      }}>
        <header>
        <Header/>
        <div className='suggestions'>
        <Suggestions/>
        </div>
        <div className='chatInput'>
          <ChatInput/>
        </div>
      </header>
    </div>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <div> Loading ... </div>), <div> Error Occur </div>);
