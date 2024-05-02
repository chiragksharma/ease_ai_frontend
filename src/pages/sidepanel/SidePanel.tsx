import React from 'react';
import logo from '@assets/img/logo.svg';
// import css from '@pages/sidepanel/SidePanel.scss';
// import '@pages/sidepanel/SidePanel.css';
import useStorage from '@src/shared/hooks/useStorage';
import exampleThemeStorage from '@src/shared/storages/exampleThemeStorage';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import Header from '@pages/sidepanel/components/header';
import Suggestions from '@pages/sidepanel/components/suggestion-cards/index';
import ChatInput from '@pages/sidepanel/components/ChatInput';
import TabSelector from '@pages/sidepanel/components/TabSelector';
import CardContainer from '@pages/sidepanel/components/cards/CardContainer';
import { ThemeProvider } from 'styled-components';
import { useTheme } from '@pages/sidepanel/hooks/useTheme';
import { lightTheme, darkTheme } from '@pages/sidepanel/styles/themes';
import GlobalStyle from '@pages/sidepanel/styles/globalStyle';
import SidePanelContainer from '@pages/sidepanel/styles/sidepanelContainer'; // This is the styled component

import '@pages/sidepanel/SidePanel.scss';

const SidePanel: React.FC = () => {
  const [theme, toggleTheme] = useTheme(); // Custom hook to get and set the theme
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyle />
      <div className={`side-panel ${theme === 'dark' ? 'dark-theme' : ''}`}>
        <Header toggleTheme={toggleTheme} theme={theme=== 'dark'} />
        <div className='tabs-selector-container'>
            <TabSelector/>
        </div>
        {/* <div className='cards'>
          <CardContainer/>
        </div> */}
        <div className="suggestions">
          <Suggestions />
        </div>
        <div className='chat-input'>
          <ChatInput />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <div> Loading ... </div>), <div> Error Occur </div>);
