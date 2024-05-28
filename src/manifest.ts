import { ManifestV3 } from 'rollup-plugin-chrome-extension';

const manifest: ManifestV3 = {
  manifest_version: 3,
  name: 'Better Jobs',
  description:
    "Filter companys' job postings from your job board search results!",
  version: '1.0',
  action: {
    default_popup: 'popup.html',
    default_icon: {
      '16': 'icons/icon16.png',
      '32': 'icons/icon32.png',
      '48': 'icons/icon48.png',
      '128': 'icons/icon128.png',
    },
  },
  permissions: ['storage'],
  content_scripts: [
    {
      matches: ['*://www.linkedin.com/jobs/*'],
      js: ['linkedin.ts'],
    },
  ],
};

export default manifest;
