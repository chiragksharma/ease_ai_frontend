import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import 'webextension-polyfill';

reloadOnUpdate('pages/background');

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate('pages/content/style.scss');

const handlers = {
  open_side_panel: async (message,sender) => {
    console.log(sender)
    await chrome.sidePanel.open({ tabId: sender.tab.id });
    await chrome.sidePanel.setOptions({
      tabId: sender.tab.id,
      path: 'src/pages/sidepanel/index.html',
      enabled: true
    });
  },
  video_comment: async (message, sender) => {
    const apiEndpoint = 'http://127.0.0.1:5000/comment';
    const payload = message.data;
    console.log("This is the data",message.data)
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      console.log('Video comment processed:', result);
    } catch (error) {
      console.error('Error sending video comment data:', error);
    }
  },

};

chrome.runtime.onMessage.addListener((message, sender) => {
  if (handlers[message.type]) {
    handlers[message.type](message, sender).catch(console.error);
  } else {
    console.warn(`No handler for message type: ${message.type}`);
  }
});
console.log('background loaded');
