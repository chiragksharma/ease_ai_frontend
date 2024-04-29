import { useEffect } from 'react';
import logo from '@assets/img/logo_white_circle_50.svg';
import hoverLogo from '@assets/img/logo_blue_circle_51.svg';
import css from '@pages/content/ui/app.scss'

export default function App() {
  useEffect(() => {
    console.log('content view loaded');
  }, []);
  const handleLogoClick = () =>{
    chrome.runtime.sendMessage({ type: 'open_side_panel' }); 
  }

  return (
    <>
    <div className="ease_ai_logo_toggle">
      <style>{css}</style>
      <div className='logo-toggle' onClick={handleLogoClick}>
      <img src={chrome.runtime.getURL(logo)} alt="Ease AI logo" className="base-logo" draggable={false} />
      <img src={chrome.runtime.getURL(hoverLogo)} alt="Ease AI logo" className="hover-logo" draggable={false} />
      </div>
    </div>
    </>
  
  );
}
