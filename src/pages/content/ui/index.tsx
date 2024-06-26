import { createRoot } from 'react-dom/client';
import App from '@pages/content/ui/app';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';


refreshOnUpdate('pages/content');

const root = document.createElement('div');
root.id = 'Ease-ai-root';

document.body.append(root);

const rootIntoShadow = document.createElement('div');
rootIntoShadow.id = 'shadow-root';

const shadowRoot = root.attachShadow({ mode: 'open' });
shadowRoot.appendChild(rootIntoShadow);


/** Inject styles into shadow dom */
// const styleElement = document.createElement('style');
// styleElement.innerHTML = injectedStyle;
// shadowRoot.appendChild(styleElement);

/** Injecting the script tag */



createRoot(rootIntoShadow).render(
    // Add Providers
   
        <App />,
  );