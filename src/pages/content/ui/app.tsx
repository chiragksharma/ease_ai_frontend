import { useEffect } from 'react';
import logo from '@assets/img/ease_ai_logo_blue.svg'
import css from '@pages/content/ui/app.scss'

export default function App() {
  useEffect(() => {
    console.log('content view loaded');
  }, []);

  return (
    <>
    <div className="ease_ai_logo_toggle">
      <style>{css}</style>
     <img src={chrome.runtime.getURL(logo)} alt="ease ai logo" draggable='false'/>
    </div>

    </>
  
  );
}
