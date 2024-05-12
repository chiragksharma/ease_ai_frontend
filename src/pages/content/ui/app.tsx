import { useEffect } from 'react';
import logo from '@assets/img/logo_white_circle_50.svg';
import hoverLogo from '@assets/img/logo_blue_circle_51.svg';
import Cursor from '@assets/img/Cursor.svg';
import { getElementByXPath, processXPathAndClick, processXPathAndType } from '@pages/background/functions';
import css from '@pages/content/ui/app.scss'

export default function App() {
  useEffect(() => {
    console.log('content view loaded');
  }, []);
  // content-script.js


  const cursor = document.createElement("img");
  cursor.src = chrome.runtime.getURL(Cursor);
  cursor.className = 'custom-cursor'; // Adding a class name
  cursor.id = 'extension-cursor';
  cursor.style.position = 'absolute';
  cursor.style.left = '0px';
  cursor.style.top = '0px';
  cursor.style.zIndex = '1000';
  cursor.style.display = 'none'; // Start with the cursor hidden
  document.body.appendChild(cursor);

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received message");
    if (request.action === "moveAndType") {
      const clickXpath = "/html[1]/body[1]/ytd-app[1]/div[1]/ytd-page-manager[1]/ytd-watch-flexy[1]/div[5]/div[1]/div[1]/div[2]/ytd-comments[1]/ytd-item-section-renderer[1]/div[1]/ytd-comments-header-renderer[1]/div[5]/ytd-comment-simplebox-renderer[1]/div[1]/yt-formatted-string[1]"
      const typeXpath = "/html[1]/body[1]/ytd-app[1]/div[1]/ytd-page-manager[1]/ytd-watch-flexy[1]/div[5]/div[1]/div[1]/div[2]/ytd-comments[1]/ytd-item-section-renderer[1]/div[1]/ytd-comments-header-renderer[1]/div[5]/ytd-comment-simplebox-renderer[1]/div[3]/ytd-comment-dialog-renderer[1]/ytd-commentbox[1]/div[2]/div[1]/div[2]/tp-yt-paper-input-container[1]/div[2]/div[1]/div[1]/ytd-emoji-input[1]/yt-user-mention-autosuggest-input[1]/yt-formatted-string[1]/div[1]"
      // //*[contains(@class, 'ytd-comment-simplebox-renderer') or @id='contenteditable-root']
      processXPathAndClick(clickXpath, () => {
        // After the click, perform typing in the specified element
        processXPathAndType(
        typeXpath,
        cursor, 
        request.text, 
        sendResponse);
    }, sendResponse);
        }
    
    return true; // Optional since we're sending a response in all code paths.
});

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
