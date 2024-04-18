import fs from 'node:fs';
import packageJson from './package.json' assert { type: 'json' };

/**
 * After changing, please reload the extension at `chrome://extensions`
 * @type {chrome.runtime.ManifestV3}
 */
const manifest = {
  manifest_version: 3,
  default_locale: 'en',
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  permissions: ['storage', 'sidePanel'],
  side_panel: {
    default_path: 'src/pages/sidepanel/index.html',
  },
  options_page: 'src/pages/options/index.html',
  background: {
    service_worker: 'src/pages/background/index.js',
    type: 'module',
    matches: ['<all_urls>'],
  },
  action: {
    default_popup: 'src/pages/popup/index.html',
    default_icon: 'icon-34.png',
  },
  // chrome_url_overrides: {
  //   newtab: 'src/pages/newtab/index.html',
  // },
  icons: {
    128: 'icon-128.png',
  },
  content_scripts: [
    {
      matches: ['<all_urls>'],
      js: ['src/pages/content/index.js'],
      css: ['assets/css/contentStyle<KEY>.chunk.css'],
    },
  ],
  devtools_page: 'src/pages/devtools/index.html',
  web_accessible_resources: [
    {
      resources: [
        'assets/js/*.js',
        'assets/css/*.css',
        'assets/svg/*.svg',
        'assets/gif/*.gif',
        '128x128.png',
        '32x32.png',
        "assets/fonts/*.woff2",
        "assets/fonts/*.woff",
        "assets/fonts/*.ttf"
      ],
      matches: ['*://*/*'],
    },
  ],
};

export default manifest;
