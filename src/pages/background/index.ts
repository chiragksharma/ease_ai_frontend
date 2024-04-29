import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import 'webextension-polyfill';

reloadOnUpdate('pages/background');

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate('pages/content/style.scss');
// This will open a side panel  on the current tab.
chrome.runtime.onMessage.addListener((message, sender) => {
    (async () => {
      if (message.type === 'open_side_panel') {
        await chrome.sidePanel.open({ tabId: sender.tab.id });
        await chrome.sidePanel.setOptions({
          tabId: sender.tab.id,
          path: 'src/pages/sidepanel/index.html',
          enabled: true
        });
      }
    })();
  });

console.log('background loaded');
